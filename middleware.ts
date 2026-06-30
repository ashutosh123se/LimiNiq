import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export default async function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.split(":")[0];
  if (host === "liminiq.com") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.liminiq.com";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = req.nextUrl;

  // Protect all /admin/* routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = await auth();

    if (!session?.user) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }

    // Block non-admins from sensitive routes
    const role = (session.user as { role?: string }).role;
    if (pathname.startsWith("/admin/settings") && role !== "SUPER_ADMIN" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Protect all /api/admin/* routes
  if (pathname.startsWith("/api/admin")) {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|images|robots.txt|sitemap.xml|api/og).*)",
  ],
};
