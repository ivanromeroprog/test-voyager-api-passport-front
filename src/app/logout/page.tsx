'use client';
import { logout } from "@/lib/services";
import { useAccessToken } from "@/providers/AccessTokenProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {

  const { setAccessToken, setUser, user } = useAccessToken();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      const response = await logout();

      if(response.status == 200) {
      	setAccessToken(null);
      	setUser(null);
      	router.push('/');
      }else{
        toast('',{
          description: "No se ha podido cerrar la sesión",
          dismissible: true,
          icon: '⚠️'
        });

      }
    }

    doLogout();
  }, [])

  return <></>;
}
