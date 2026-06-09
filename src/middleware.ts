import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUserRole } from "@/lib/auth/getCurrentUserRole";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  const { supabase, user, supabaseResponse } = await updateSession(request);

  if (!supabase) {
    return supabaseResponse;
  }

  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    const { role } = await getCurrentUserRole(supabase);

    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = role === "student" ? "/dashboard" : "/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    const { role } = await getCurrentUserRole(supabase);

    if (role !== "student") {
      const url = request.nextUrl.clone();
      url.pathname = role === "admin" ? "/admin" : "/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  if (pathname === "/login" && user) {
    const { role } = await getCurrentUserRole(supabase);

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (role === "student") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login"],
};
