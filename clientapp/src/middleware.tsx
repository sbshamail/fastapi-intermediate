// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IsAuth } from './utils/action/cookies';
export async function middleware(request: NextRequest) {
  const isAuth = await IsAuth();
  console.log('== in middleware, auth check', isAuth);
  if (!isAuth) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.url); // Pass the original path as a query parameter
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/product/:path*'],
};
