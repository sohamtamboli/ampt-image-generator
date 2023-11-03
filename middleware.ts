import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export function middleware(req: NextRequest) {
  console.log('middleware running');
  // Check if the user is authenticated

  const cookieStore = cookies();
  const hasCookie = cookieStore.get('jwtToken');
  const isAuthenticated = hasCookie; // User is authenticated if the jwtToken cookie exists

  if (
    !isAuthenticated &&
    !['/login', '/signup'].includes(req.nextUrl.pathname)
  ) {
    // If the user is not authenticated and the requested page is not the login or signup page,
    // redirect them to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (
    isAuthenticated &&
    ['/login', '/signup', '/'].includes(req.nextUrl.pathname)
  ) {
    // If the user is authenticated and the requested page is the login or signup page,
    // redirect them to the home page
    return NextResponse.redirect(new URL('/home', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
