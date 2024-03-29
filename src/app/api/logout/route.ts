import {
  accessTokenCookieName,
  refreshTokenCookieName,
} from "@/lib/services";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  //Eliminar tokens del server
  cookies().delete(accessTokenCookieName);
  cookies().delete(refreshTokenCookieName);

  return NextResponse.json({
    message: "OK",
  });
}

export { handler as POST };
