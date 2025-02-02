import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSessionUser() {
  const session =  await getServerSession(authOptions);
  
  if (!session?.user) return null;
  const userData = session?.user as User;

  return userData;
}