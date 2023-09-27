import bcrypt from 'bcrypt';
import { YogaInitialContext } from 'graphql-yoga';
import { QueryLoginUserArgs } from '@/graphql/generated/graphql';
import UserModel from '@/database/models/user';
import { createToken, getUserIdFromToken } from '@/utils/auth';

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
) {
  ctx.request.cookieStore?.delete('token');
}

export async function getUser(
  parent: unknown,
  args: unknown,
  ctx: YogaInitialContext,
) {
  const userId = await getUserIdFromToken(ctx);
  const user = await UserModel.findOne({ _id: userId });

  return user;
}
