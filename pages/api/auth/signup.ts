import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, username, password, firstName, lastName } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res
        .status(422)
        .json({
          message: "Email must include an @ and password must be 7 characters",
        });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    /* Check for existing users by email Or username identifiers */
    const existingUserEmail = await db
      .collection("users")
      .findOne({ email: email });

    const existingUserUsername = await db
      .collection("users")
      .findOne({ username: username });

    if (existingUserEmail || existingUserUsername) {
      res.status(422).json({ message: "Username or email already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: hashedPassword,
      remainingTimelines: 1,
    });

    res.status(201).json({ message: "User created" });
    client.close();
  }
}

export default handler;
