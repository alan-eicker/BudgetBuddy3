export function authenticateUser(
  parent,
  args: { username: string; password: string },
) {
  return { username: args.username };
}

// export function logout() {}
