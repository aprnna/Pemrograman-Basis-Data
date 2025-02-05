"use client";
import { Input } from "@heroui/input";
import { title } from "@/components/primitives";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true)
    signIn("credentials", {
      username,
      password,
      redirect:false
    }).then(({ok,error}:any) => {
      if (error) {
        toast.error("Oops, something went wrong")
      }
      setLoading(false)
    })
  };

  useEffect(() => {
    
    if (session) {
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
        router.push(redirectTo)
      }
  },[session])

  return (
    <div className="grid grid-cols-2 p-4">
      <div>
        <img alt="loginImg" src="/loginImg.png" />
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-md w-full space-y-5">
          <h1 className={title({ color: "coklat" })}>Silahkan Login</h1>
          <hr className="h-1 bg-black" />
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              required
              id="username"
              label="Username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              isLoading={loading}
              className="w-full"
              color="primary"
              type="submit"
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

