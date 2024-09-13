import { NotFoundError } from "../error/NotFoundError";
import { Grocery, UpdateGroceryData } from "../interfaces/grocery.interface";
import * as GroceryModel from "../models/grocery.models";

export const createGroceryItem = (
  body: Omit<Grocery, "id">,
  userId: string
) => {
  return GroceryModel.GroceryModel.createGroceryItem(body, userId);
};

export const deleteGroceryItem = async (groceryId: string) => {
  const grocery = await GroceryModel.GroceryModel.getGroceryById(groceryId);
  if (grocery!.length == 0) {
    throw new NotFoundError("Grocery Not Found");
  }
  return GroceryModel.GroceryModel.deleteGroceryItem(groceryId);
};

export const getGroceryItems = () => {
  return GroceryModel.GroceryModel.getGroceryItems();
};

export const updateGrocery = async (
  itemId: string,
  data: UpdateGroceryData
) => {
  const grocery = await GroceryModel.GroceryModel.getGroceryById(itemId);
  if (grocery!.length == 0) {
    throw new NotFoundError("Grocery Not Found");
  }

  return GroceryModel.GroceryModel.updateGrocery(itemId, data);
};
