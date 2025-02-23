import NextAuth from "next-auth";
import { authOptions } from "@/lib/authentication/auth";

const handler = NextAuth(authOptions);

// export default NextAuth(authOptions);
export { handler as GET, handler as POST };
