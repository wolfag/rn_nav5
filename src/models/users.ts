export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  userToken: string;
}

export const Users: User[] = [
  {
    id: 1,
    email: 'wolfag1@gmail.com',
    username: 'wolfag1',
    password: 'password',
    userToken: 'token1',
  },
  {
    id: 2,
    email: 'wolfag2@gmail.com',
    username: 'wolfag2',
    password: 'password',
    userToken: 'token2',
  },
  {
    id: 3,
    email: 'wolfag3@gmail.com',
    username: 'wolfag3',
    password: 'password',
    userToken: 'token3',
  },
];
