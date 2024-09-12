import { User } from "../interfaces/user.interfaces";
import { BaseModel } from "./base.models";
export class UserModel extends BaseModel {
  static async signUp(body: Omit<User, "id">) {
    try {
      const userToCreate = {
        email: body.email,
        password: body.password,
        name: body.name,
      };

      const userId = await this.queryBuilder()
        .insert(userToCreate)
        .table("users");

      return userId;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Internal Server Error");
      }
    }
  }


  static async getUserByEmail(email: string) {
    try {
      console.log(`came inside get user email`);

      const user = await this.queryBuilder()
        .table("users")
        .select("users.id", "users.email", "users.name", "users.password")
        .where({ "users.email": email })
        .first();

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Internal Server Error");
      }
    }
  }
}
