import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Find all users
    const usersCursor = await db.collection("users").find({});

    // Convert the cursor to an array of users
    const users = await usersCursor.toArray();
    console.log(users, "usersCursor");

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    // send the user data to client
    res.status(200).json({ users });
    // close mongodb connection
    client.close();
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handler;
