import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const role = request.cookies.get("role")?.value

  if (request.nextUrl.pathname.startsWith("/admin") && !token && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/news", request.url))
  }

  if (request.nextUrl.pathname.startsWith("/news") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (request.nextUrl.pathname.startsWith("/news") && token && role=== 'admin') {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  if (["/auth/register", "/auth/login"].includes(request.nextUrl.pathname) && token && role !== "admin") {
    return NextResponse.redirect(new URL("/news", request.url))
  }

  if (["/auth/register", "/auth/login"].includes(request.nextUrl.pathname) && token && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}