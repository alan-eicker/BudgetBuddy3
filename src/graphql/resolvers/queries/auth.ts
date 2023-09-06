import { AuthResponse } from '../../../generated/graphql';

export function authenticateUser(
  parent,
  args: { username: string; password: string },
): AuthResponse {
  return { username: args.username };
}

export function logoutUser(parent, args): boolean {
  return true;
}
