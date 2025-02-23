import prisma from "@/lib/db";
import { getServerSession, type NextAuthOptions } from "next-auth";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { DASHBOARD, LOGIN, SIGN_OUT } from "../constants/Route";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: LOGIN,
    signOut: SIGN_OUT,
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect() {
      // Always redirect to dashboard after successful sign in
      return DASHBOARD;
    },
    async signIn({ profile }) {
      if (profile) {
        await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          update: {
            name: profile.name,
            image: profile.image,
          },
          create: {
            email: profile.email,
            name: profile.name,
            image: profile.image,
          },
        });
      }
      return true;
    },
    async session({ session, user }) {
      session.user = user;
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        token.id = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

/**
 * a helper function so you don't need to pass authOptions around:
 * @param args
 * @returns
 */
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
