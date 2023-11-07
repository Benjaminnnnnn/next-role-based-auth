import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token?.role);

    if (
      // @ts-ignore
      req.nextUrl.pathname.startsWith("/create-user") &&
      req.nextauth.token?.role !== "admin"
    ) {
      //@ts-ignore
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/create-user"] };
