"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import { useEffect } from "react";


export default async function Home() {
  const {data:session} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(!session) return router.push('auth/login')
    const userData = session?.user as User
    let redirectTo = '/error';
    
    switch (userData.role) {
      case 'Manager':
        redirectTo = '/admin'
        break;
      case 'Kasir':
        redirectTo = '/pesanan/add'
        break;
      case 'Koki':
        redirectTo = '/pesanan/ongoing'
        break;
      case 'Karyawan':
        redirectTo = '/bahan_baku'
        break;
      default:
        redirectTo = '/error'
        break;
    }

    return router.push(redirectTo)
  },[session])
}
