import {
  accessTokenCookieName,
  login,
  refreshTokenCookieName,
} from "@/lib/services";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { email, password } = await req.json();

  const response = await login({ email, password });

  const accessToken = response.data?.data?.tokens?.access_token;
  const refreshToken = response.data?.data?.tokens?.refresh_token;

  const userData = response.data?.data?.user;

  //Si no vino el access token devolver status y respuesta del server
  if (!accessToken) {
    return NextResponse.json(response?.data, { status: response.status });
  }

  //Guardar access token para usar en server
  cookies().set({
    name: accessTokenCookieName,
    value: accessToken,
    httpOnly: true,
    path: "/",
  });

  //Guardar aresresh token para usar en server
  if (!refreshToken) {
    cookies().set({
      name: refreshTokenCookieName,
      value: refreshToken,
      httpOnly: true,
      path: "/",
    });
  }

  return NextResponse.json({
    message: "OK",
    access_token: accessToken,
    user: userData,
  });
}

export { handler as POST };
