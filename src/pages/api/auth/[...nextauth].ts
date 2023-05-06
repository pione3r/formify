import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/db";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;

      // 이미 존재하는 회원
      if ((await getDoc(doc(db, "users", user.email))).exists()) {
        setDoc(doc(db, "users", user.email), {
          ...user,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        });
        return true;
      } else {
        // 새로운 회원 가입
        setDoc(doc(db, "users", user.email), {
          ...user,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        });
        return true;
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;
      session.accessTokenExpires = token.accessTokenExpires as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
