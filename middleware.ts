import { NextResponse } from "next/server";
import { auth } from "./auth";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
} from "./lib/consts";

const allowedOrigins = ["http://localhost:3000", "https://trusovia.com"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default auth((req) => {
  // Check the origin from the request
  // const origin = req.headers.get("origin") ?? "";
  // const isAllowedOrigin = allowedOrigins.includes(origin);
  // if (isAllowedOrigin) {
  //   return NextResponse.json(
  //     { message: "CORS is allowed" },
  //     { status: 200, headers: corsOptions }
  //   );
  // }

  // // Handle preflighted requests
  // const isPreflight = req.method === "OPTIONS";

  // if (isPreflight) {
  //   const preflightHeaders = {
  //     ...((isAllowedOrigin && {
  //       "Access-Control-Allow-Origin": origin,
  //     }) as unknown as Record<string, string>),
  //     ...corsOptions,
  //   };
  //   return NextResponse.json({}, { headers: preflightHeaders });
  // }

  // // Handle simple requests
  // const response = NextResponse.next();

  // if (isAllowedOrigin) {
  //   response.headers.set("Access-Control-Allow-Origin", origin);
  // }

  // Object.entries(corsOptions).forEach(([key, value]) => {
  //   response.headers.set(key, value);
  // });

  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  const isSecureRoute = nextUrl.pathname.startsWith("/secure");

  if (isSecureRoute && !isLoggedIn) {
    const newUrl = new URL("/", nextUrl);
    return Response.redirect(newUrl);
  }

  // return response;
  return NextResponse.next();
});

export const config = {
  unstable_allowDynamic: [
    // allows a single file
    "/helpers/sanity.ts",
    "/lib/actions.ts",
    "/lib/consts.ts",
    "/lib/utils.ts",
  ],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
