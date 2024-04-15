import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(
    req as NextApiRequest & {
      cookies: Partial<{ [key: string]: string }>;
    },
    res as NextApiResponse<IncomingMessage>,
    authOptions
  );

  const { sessionUserEmail } = req.body;

  /* If no session, forbid request and return */
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    if (req.method !== "POST") {
      res.status(405).json({ message: "method not allowed" });
      return;
    }

    const user = await db
      .collection("users")
      .findOne({ email: sessionUserEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await db
      .collection("users")
      .updateOne({ _id: user._id }, { $inc: { remainingTimelines: -1 } });

    res.status(200).json({ message: "User updated successfully" });
    return;
  } catch (err) {
    res.status(500).json({ message: "Error occurred: ", err });
    return;
  }
}

export default handler;
