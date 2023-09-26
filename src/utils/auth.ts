import { SignJWT } from 'jose';

export async function createToken(payload?: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const jwt = await new SignJWT(payload || {})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1h')
    .sign(secret);

  return jwt;
}
