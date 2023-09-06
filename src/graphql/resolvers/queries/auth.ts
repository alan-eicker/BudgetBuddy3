import { AuthResponse } from '../../../generated/graphql';

export function authenticateUser(
  parent,
  args: { username: string; password: string },
): AuthResponse {
  return { status: 200, message: 'ok' };
}

export function logoutUser(parent, args): boolean {
  return true;
}
