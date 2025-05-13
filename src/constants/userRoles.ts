export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'normal_user',
} as const;

export const USER_ROLES_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.USER]: 'User',
};

export const userRoleList = [
  {
    value: USER_ROLES.ADMIN,
    label: 'Admin',
  },
  {
    value: USER_ROLES.USER,
    label: 'User',
  },
];
