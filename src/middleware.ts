import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization') as string;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const isValid = await jwtVerify(token, secret);

    if (!isValid) {
      throw new Error();
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [],
  // matcher: ['/account/dashboard/:path*', '/account/dashboard/profile'],
};