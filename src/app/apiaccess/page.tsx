"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { useAxios } from "@/providers/AxiosProvider";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [endpoint, setEndPoint] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { axiosApiAccessTokenInstance: tkn } = useAxios();
  const { user } = useAccessToken();
  const router = useRouter();

  function query(e: FormEvent<HTMLFormElement>): void {
    const doQuery = async () => {
      e.preventDefault();
      if (tkn === null) return;

      const response = await tkn.get(`${endpoint}`,{params: {page}});

      if (response.status == 200) {
        setData(response?.data?.data);
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

    doQuery();
  }

  if(!user) return router.push('/');

  return (
    <main className="xl:mx-auto max-w-7xl mx-5">
      <h1 className="p-4 text-2xl bg-primary text-primary-foreground rounded-lg">
        Api Access
      </h1>
      <form
        className="w-full md:w-1/3 space-y-6 mt-5 md:mx-auto"
        onSubmit={query}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="endpoint">Endpoint </Label>
          <Input
            id="endpoint"
            name="endpoint"
            type="text"
            placeholder="users"
            onChange={(e) => setEndPoint(e.target.value)}
            required
            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="page">Page </Label>
          <Input
            id="page"
            name="page"
            type="number"
            value={page}
            placeholder="users"
            onChange={(e) => setPage(Number(e.target.value))}
            required
            className="invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          />
        </div>

        {JSON.stringify(data)}

        <div className="text-center">
          <Button type="submit" className="mx-auto">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
