import RedirectMap from "./redirect-map.json";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
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
