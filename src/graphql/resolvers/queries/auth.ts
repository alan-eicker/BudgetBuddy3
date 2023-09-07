import {
  StatusResponse,
  AuthenticateUserQueryVariables,
  LogoutUserQueryVariables,
} from '../../../generated/graphql';

export function authenticateUser(
  _: any,
  args: AuthenticateUserQueryVariables,
): StatusResponse {
  return { code: 200, message: 'ok' };
}

export function logoutUser(_: any, args: LogoutUserQueryVariables): boolean {
  return true;
}
