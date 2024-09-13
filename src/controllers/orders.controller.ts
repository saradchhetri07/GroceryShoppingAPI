import { Request } from "../interfaces/auth.interfaces";
import { Response, NextFunction } from "express";
import { StatusCodes as HTTPStatusCodes } from "http-status-codes";
import * as OrderServices from "../services/orders.services";
import { BadRequestError } from "../error/BadRequestError";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const userId = req.user!.id;
    const { orderItems } = body;

    await OrderServices.createOrder(body, userId, orderItems);
    return res
      .status(HTTPStatusCodes.CREATED)
      .json({ message: "Grocery item created" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    await OrderServices.cancelOrder(orderId);
    return res.status(HTTPStatusCodes.OK).json({ message: "Order Cancelled" });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};

export const getAvailableGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groceries = await OrderServices.getAvailableGrocery();
    return res.status(HTTPStatusCodes.OK).json({ data: groceries });
  } catch (error) {
    if (error instanceof Error) {
      next(new BadRequestError(error.message));
    }
  }
};
