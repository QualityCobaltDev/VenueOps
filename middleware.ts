import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPrefix = '/app';

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get('venueops_session')?.value);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(protectedPrefix) && !hasSession) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if ((pathname === '/signin' || pathname === '/signup') && hasSession) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/signin', '/signup'],
};
