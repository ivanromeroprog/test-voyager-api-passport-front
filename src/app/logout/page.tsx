'use client';
import { logout } from "@/lib/services";
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const { setAccessToken, setUser, user } = useAccessToken();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      const response = await logout();
      
      console.log(response);

      setAccessToken(null);
      setUser(null);
      router.push('/');
    }

    doLogout();
  }, [])

  return <></>;
}
