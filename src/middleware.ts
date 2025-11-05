import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role?: string;
  exp?: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  // console.log(token)
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const role = decoded?.role;
    console.log(role)

  
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard")) {
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT decode error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}


export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/:path*"],
};
