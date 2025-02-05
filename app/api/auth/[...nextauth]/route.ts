import NextAuth from "next-auth"
import { AuthOptions } from "@/utils/authoptions";

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST };