import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionUserEmail } = req.body;
  console.log("GET ALL USERDATA");

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

    // Extract the enteredFirstName and enteredLastName from the user object

    res.status(200).json({ user });
    client.close();
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
