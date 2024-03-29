import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    const { sessionUserEmail, ...userDataToSend } = data;

    console.log("people.ts has been ran");

    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Find the user based on their email (or any unique identifier)
      const user = await db
        .collection("users")
        .findOne({ email: sessionUserEmail });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user document with the new data
      await db.collection("users").updateOne(
        { _id: user._id },
        {
          $push: {
            userData: userDataToSend,
          },
        }
      );
      res.status(200).json({ message: "Data updated successfully" });
      client.close();
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
