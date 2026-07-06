import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const authCookie = request.cookies.get('adminAuth');
    
    if (!authCookie) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === '/admin/login') {
    const authCookie = request.cookies.get('adminAuth');
    if (authCookie) {
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
