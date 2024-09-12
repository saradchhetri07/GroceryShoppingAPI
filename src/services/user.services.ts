import { User } from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import * as UserModel from "../models/user.models";

export const signUp = async (body: Omit<User, "id">) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  console.log(`came inside sign up`);

  return UserModel.UserModel.signUp({ ...body, password: hashedPassword });
};

export const getUserByEmail = (email: string) => {
  console.log(`came inside user service`);
  return UserModel.UserModel.getUserByEmail(email);
};
