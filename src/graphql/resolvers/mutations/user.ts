import bcrypt from 'bcrypt';
import { MutationCreateUserArgs } from '@/graphql/generated/graphql';
import UserModel from '@/database/models/user';

export async function createUser(
  parent: unknown,
  args: MutationCreateUserArgs,
) {
  const password = await bcrypt.hash(args.input.password as string, 10);
  const user = new UserModel({
    ...args.input,
    password,
  });
  await user.save();
}
