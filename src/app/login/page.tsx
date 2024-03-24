"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { useAxios } from "@/providers/AxiosProvider";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useAccessToken();
  const { axiosAppInstance: ax, axiosApiAccessTokenInstance: tkn } = useAxios();

  /*
  useEffect(() => {
    const f = async ()=> {
      console.log(await tkn.get('/users'));
    }
    f();
  }, [tkn])
*/

  function login(e: FormEvent<HTMLFormElement>): void {
    const doLogin = async () => {
      e.preventDefault();
      if (ax === null) return;

      const response = await ax.post("/login", {
        email,
        password,
      });

      console.log(response);

      if (response.data?.access_token) {
        setAccessToken(response.data?.access_token);
      } else if(response.data?.errors){
        toast('',{
          description: (Object.values(response.data?.errors)[0] as string[]).join(" "),
          dismissible: true,
          icon: '⚠️',
      });
      } else {
        toast('',{
          description: response.data?.message,
          dismissible: true,
          icon: '⚠️'
        });
      }
    };
    doLogin();
  }

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
            placeholder="myuser"
            onChange={(e) => setEmail(e.target.value)}
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
