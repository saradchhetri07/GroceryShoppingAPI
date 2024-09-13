import { User } from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import * as UserModel from "../models/user.models";

export const signUp = async (body: Omit<User, "id">) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  return UserModel.UserModel.signUp({ ...body, password: hashedPassword });
};

export const getUserByEmail = (email: string) => {
  return UserModel.UserModel.getUserByEmail(email);
};
