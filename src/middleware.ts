import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  // Add logic to validate token;
  // const isValid = false; // bcrypt...

  // if (!token || !isValid) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/dashboard/:path*', '/account/dashboard/profile'],
};
