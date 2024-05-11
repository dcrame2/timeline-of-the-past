import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials, req) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        let user;

        const userViaEmail = await usersCollection.findOne({
          email: credentials!.identifier,
        });
        const userViaUsername = await usersCollection.findOne({
          username: credentials!.identifier,
        });

        user = userViaEmail || userViaUsername;

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in");
        }

        client.close();

        const returnedUser = { user: { ...user } };
        console.log(returnedUser, "USASAA");

        return Promise.resolve(returnedUser);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log(user, "Session top things");
      // console.log(token, "TOKEN top things");
      if (user) {
        token.user = user.user;
      }

      return token;
    },
    //TODO: password is being returned in session, we may want to remove that
    async session({ session, token }) {
      // console.log(session, "Session things");
      // console.log(token, "TOKEN things");
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
