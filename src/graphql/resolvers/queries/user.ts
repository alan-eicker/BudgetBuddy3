import { QueryLoginUserArgs } from '../../generated/graphql';

export async function loginUser(parent: unknown, args: QueryLoginUserArgs) {
  console.log(args);
}

export function logoutUser(): boolean {
  return true;
}
