import { getServerSession } from "next-auth";
import { User } from "@/types/user";

export default async function getSessionUser() {
  const session =  await getServerSession();

  if (!session?.user) return null;
  const userData = session?.user as User;
  
  return userData;
}