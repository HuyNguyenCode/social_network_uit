import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const privatePath = ["/me"];
const authPath = ["/auth"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  //Chưa đăng nhập thì không cho vào private path
  if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  //Đăng nhập rồi thì không cho vào auth nữa
  if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url));
  }
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [ "/me", "/auth"],
};
