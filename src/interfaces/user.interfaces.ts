export enum Role {
  USER = "user",
  SUPERUSER = "superuser",
}
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
}
