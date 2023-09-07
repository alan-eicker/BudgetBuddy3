import { StatusResponse } from '../../../generated/graphql';

export function authenticateUser(
  parent,
  args: { username: string; password: string },
): StatusResponse {
  return { code: 200, message: 'ok' };
}

export function logoutUser(parent, args): boolean {
  return true;
}
