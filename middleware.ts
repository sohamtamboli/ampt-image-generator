import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CognitoJwtVerifier } from "aws-jwt-verify";


// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID as string,
  tokenUse: "access",
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
});
export async   function  middleware(req: NextRequest) {
  console.log('middleware running');
  // Check if the user is authenticated
console.log({ userPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID as string,
  tokenUse: "access",
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,})
  const cookieStore = cookies();
  const hasCookie = cookieStore.get('jwtToken');
  console.log(hasCookie)
let isAuthenticated = false;
  if(hasCookie) {
    try {
      const payload = await verifier.verify(
        hasCookie.value 
      );
      isAuthenticated =true
      console.log("Token is valid. Payload:", payload);
    } catch {
      console.log("Token not valid!");
    }
  }
// User is authenticated if the jwtToken cookie exists

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
