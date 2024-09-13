import { NextFunction, Response } from "express";
import { StatusCodes as HTTPStatusCodes } from "http-status-codes";
import { Request } from "../interfaces/auth.interfaces";
import * as GroceryServices from "../services/grocery.services";
import { BadRequestError } from "../error/BadRequestError";

export const createGroceryItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const userId = req.user!.id;

    console.log(`inside controller create grocery item`, body);

    await GroceryServices.createGroceryItem(body, userId);
    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "Grocery item created" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const deleteGroceryItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groceryId } = req.params;
    await GroceryServices.deleteGroceryItem(groceryId);
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "Grocery item deleted" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const getGroceryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groceryItems = await GroceryServices.getGroceryItems();
    return res.status(HTTPStatusCodes.OK).json({ message: groceryItems });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const updateGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groceryId } = req.params;
    const { body } = req;
    await GroceryServices.updateGrocery(groceryId, body);
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "Grocery item Updated" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};
