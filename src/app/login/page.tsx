"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { useAxios } from "@/providers/AxiosProvider";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken, setUser, user } = useAccessToken();
  const { axiosAppInstance: ax } = useAxios();
  const router = useRouter();
  
  function login(e: FormEvent<HTMLFormElement>): void {
    const doLogin = async () => {
      e.preventDefault();
      if (ax === null) return;
      let response = null; 
      try {
        response = await ax.post("/login", {
          email,
          password,
        });
      } catch (e) {}

      if (response?.data?.access_token) {
        setAccessToken(response?.data?.access_token);
        setUser(response?.data?.user);
      } else if(response?.data?.errors){
        toast('',{
          description: (Object.values(response?.data?.errors)[0] as string[]).join(" "),
          dismissible: true,
          icon: '⚠️',
      });
      } else {
        toast('',{
          description: response?.data?.message ?? "Error de conexión",
          dismissible: true,
          icon: '⚠️'
        });
      }
    };
    doLogin();
  }

  useEffect(() => {
    if(user) return router.push('/');
  }, [user])
  

  return (
    <main className="xl:mx-auto max-w-7xl mx-5">
      <h1 className="p-4 text-2xl bg-primary text-primary-foreground rounded-lg">
        Login
      </h1>
      <form
        className="w-full md:w-1/3 space-y-6 mt-5 md:mx-auto"
        onSubmit={login}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">E-mail </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="user@user.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="mt-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          />
        </div>

        <div className="text-center">
          <Button type="submit" className="mx-auto">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
