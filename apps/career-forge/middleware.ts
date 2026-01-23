import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth';

export const config = {
  matcher: [
    // Only nav-relevant paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Or more specific: '/dashboard/:path*', '/app/:path*'
  ]
}

export default auth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
});