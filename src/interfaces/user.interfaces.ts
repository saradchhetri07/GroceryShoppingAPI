export enum Role {
  USER,
  SUPERUSER,
}
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
}
