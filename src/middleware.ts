import RedirectMap from "./redirect-map.json";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const printPathname = (pathname: string, method: string) => {
  if (pathname.includes("api")) {
    console.log("======================");
    console.log("미들웨어 API 요청: ", method, ",", pathname);
    console.log("======================");
  } else if (!/\.[^/]+$/.test(pathname.split("/").pop() || "")) {
    console.log("======================");
    console.log("미들웨어 ROUTE 요청: ", method, ",", pathname);
    console.log("======================");
  }
};

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  printPathname(pathname, request.method);

  const redirectEntry: RedirectEntry | undefined = (
    RedirectMap as Record<string, RedirectEntry>
  )[pathname];

  if (redirectEntry) {
    const url = request.nextUrl.clone();
    url.pathname = redirectEntry.destination;
    return NextResponse.redirect(new URL(url.pathname, request.url));
  }

  // No redirect found, continue without redirecting
  return NextResponse.next();
}
