'use client';
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const { setAccessToken, setUser, user } = useAccessToken();
  const router = useRouter();

  useEffect(() => {
    setAccessToken(null);
    setUser(null);
    router.push('/');
  }, [])
  

  return <></>;
}
