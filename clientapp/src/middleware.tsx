// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IsAuth } from './utils/action/cookies';
export async function middleware(request: NextRequest) {
  const isAuth = await IsAuth();
  // console.log('== in middleware, auth check', isAuth);

  const path = request.nextUrl.pathname;

  if (path.startsWith('/product') && !isAuth) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.url); // Pass the original path as a query parameter
    return NextResponse.redirect(loginUrl);
  }

  if (path.startsWith('/admin')) {
    const url = new URL(request.url);
    const origin = url.origin;
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('origin', origin);
    requestHeaders.set('pathname', path);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*', '/admin/:path*'],
};
