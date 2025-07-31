// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Redirect root to dashboard
  if (pathname === '/') {
    const defaultLocale = routing.defaultLocale || routing.locales[0];
    req.nextUrl.pathname = `/${defaultLocale}/dashboard`;
    return Response.redirect(req.nextUrl);
  }
  
  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};