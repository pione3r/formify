import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"];
    accessToken: string;
    accessTokenExpires: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
}
