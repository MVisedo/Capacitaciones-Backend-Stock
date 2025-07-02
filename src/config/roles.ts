const allRoles = {
  user: ['getProducts','getStock'],
  admin: ['getUsers', 'manageUsers','getProducts','manageProducts','manageStock','getStock'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
