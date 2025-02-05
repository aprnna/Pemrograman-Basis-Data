import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { AuthOptions } from "./authoptions";
export default async function getSessionUser() {
  const session =  await getServerSession(AuthOptions);
  
  if (!session?.user) return null;
  const userData = session?.user as User;

  return userData;
}