import { environment } from '../config/environment';

export type UserCredentials = {
  username: string;
  password: string;
};

export const users = {
  standard: {
    username: environment.standardUser,
    password: environment.standardPassword,
  },

  invalid: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
} satisfies Record<string, UserCredentials>;