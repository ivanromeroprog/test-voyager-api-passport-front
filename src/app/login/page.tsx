'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { FormEvent, useState } from "react";

export default function Page() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { accessToken, setAccessToken } = useAccessToken();

  function login(e: FormEvent<HTMLFormElement>): void {
    const doLogin = async () => {
      e.preventDefault();

      try {

        const response = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({username: username, password: password}),
        });

        const data = await response.json();

        setAccessToken(data.access_token);
        
      } catch (error) {
        console.log(error);
      }
    };
    doLogin();
  }

  return (
    <main className="xl:mx-auto max-w-7xl mx-5">
       {accessToken}
      <h1 className="p-4 text-2xl bg-primary text-primary-foreground rounded-lg">
        Login
      </h1>
      <form
        className="w-full md:w-1/3 space-y-6 mt-5 md:mx-auto"
        onSubmit={login}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">User name </Label>
          <Input id="username" name="username" placeholder="myuser" onChange={e=>setUserName(e.target.value)} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="mt-2">
            Password
          </Label>
          <Input type="password" name="password" id="password" onChange={e=>setPassword(e.target.value)} />
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
