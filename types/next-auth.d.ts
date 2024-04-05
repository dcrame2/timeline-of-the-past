import { ObjectId } from "mongodb";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      _id: ObjectId;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
    };
  }
  interface User {
    user: {
      _id: ObjectId;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: ObjectId;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
    };
  }
}
