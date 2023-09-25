import bcrypt from 'bcrypt';
import { MutationCreateUserArgs } from '@/graphql/generated/graphql';
import UserModel from '@/database/models/user';
import { createGraphQLError } from 'graphql-yoga';

export async function createUser(
  parent: unknown,
  args: MutationCreateUserArgs,
) {
  const existingUser = await UserModel.findOne({
    email: { $regex: new RegExp(args.input.email as string, 'i') },
  });

  if (existingUser) {
    throw createGraphQLError('Error creating user');
  }

  const password = await bcrypt.hash(args.input.password as string, 10);
  const user = new UserModel({
    ...args.input,
    password,
  });

  await user.save();
}
