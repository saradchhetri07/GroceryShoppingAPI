import { Grocery, UpdateGroceryData } from "../interfaces/grocery.interface";
import { BaseModel } from "./base.models";

export class GroceryModel extends BaseModel {
  static async createGroceryItem(body: Omit<Grocery, "id">, userId: string) {
    try {
      const groceryToCreate = {
        name: body.name,
        price: body.price,
        inventoryLevel: body.inventoryLevel,
        createdBy: userId,
      };

      await this.queryBuilder().insert(groceryToCreate).table("grocery_items");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  static async deleteGroceryItem(groceryId: string) {
    try {
      await this.queryBuilder()
        .table("grocery_items")
        .where({ item_id: groceryId })
        .del();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Internal Server Error");
      }
    }
  }

  static async getGroceryItems() {
    try {
      const groceryItems = await this.queryBuilder()
        .table("grocery_items")
        .select("*");
      return groceryItems;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Internal Server Error");
      }
    }
  }

  static async getGroceryById(itemId: string) {
    try {
      const grocery = this.queryBuilder()
        .table("grocery_items")
        .where({ item_id: itemId });
      return await grocery;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  static async updateGrocery(itemId: string, data: UpdateGroceryData) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error("No data provided to update");
      }
      await this.queryBuilder()
        .table("grocery_items")
        .where({ item_id: itemId })
        .update(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
