import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authentication/auth";

export interface Session {
  user: {
    email: string;
    id: string;
    name: string;
    image?: string;
    isAdmin: boolean;
  };
}

export const getSession = async () => {
  return getServerSession(authOptions) as Promise<Session>;
};

