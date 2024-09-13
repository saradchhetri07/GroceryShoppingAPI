import { Order, OrderItem } from "../interfaces/order.interfaces";
import * as OrderModel from "../models/orders.models";

export const createOrder = (
  body: Omit<Order, "id">,
  userId: string,
  orderItems: OrderItem[]
) => {
  return OrderModel.OrderModel.createOrder(body, userId, orderItems);
};

export const cancelOrder = (orderId: string) => {
  return OrderModel.OrderModel.cancerOrder(orderId);
};
