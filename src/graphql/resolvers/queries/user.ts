import bcrypt from 'bcrypt';
import { SignJWT, decodeJwt } from 'jose';
import { YogaInitialContext } from 'graphql-yoga';
import { QueryLoginUserArgs } from '../../generated/graphql';
import UserModel from '@/database/models/user';
import { GraphQLError } from 'graphql';

const createToken = async (payload?: any) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const jwt = await new SignJWT(payload || {})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1h')
    .sign(secret);

  return jwt;
};

export async function loginUser(
  parent: unknown,
  args: QueryLoginUserArgs,
  ctx: YogaInitialContext,
) {
  const { username, password } = args;
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error();
  }

  const isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    throw new Error();
  }

  const token = await createToken({
    username: user.username,
    userId: user._id,
  });

  ctx.request.cookieStore?.set({
    name: 'token',
    value: token,
    httpOnly: true,
    domain: 'localhost',
    expires: null,
  });
}

export function logoutUser(
  parent: unknown,
  args: unknown,
  ctx: YogaInitialContext,
): boolean {
  ctx.request.cookieStore?.delete('token');
  return true;
}

export async function getUser(
  parent: unknown,
  args: unknown,
  ctx: YogaInitialContext,
) {
  const token = await ctx.request.cookieStore?.get('token');

  if (!token) {
    throw new GraphQLError('No token exists');
  }

  const { userId } = decodeJwt(token.value);
  const user = await UserModel.findOne({ _id: userId });

  return user;
}
