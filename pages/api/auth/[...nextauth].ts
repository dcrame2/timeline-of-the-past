import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

type Credentials = {
  identifier: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials: Credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        let user;

        const userViaEmail = await usersCollection.findOne({
          email: credentials.identifier,
        });
        const userViaUsername = await usersCollection.findOne({
          username: credentials.identifier,
        });

        user = userViaEmail || userViaUsername;

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in");
        }

        client.close();

        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          redirect: {
            destination: "/auth/protected",
          },
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
