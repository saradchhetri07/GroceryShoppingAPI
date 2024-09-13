import { NotFoundError } from "../error/NotFoundError";
import { Order, OrderItem } from "../interfaces/order.interfaces";
import { BaseModel } from "./base.models";

export class OrderModel extends BaseModel {
  static async createOrder(
    body: Omit<Order, "id">,
    userId: string,
    orderItems: OrderItem[]
  ) {
    try {
      const orderToCreate = {
        user_id: userId,
        status: body.status,
        total_quantity: body.totalQuantity,
        total_price: body.totalPrice,
      };

      await this.queryBuilder().transaction(async (trx) => {
        // Insert into `orders` table and return the generated `order_id`
        const [orderId] = await trx("orders")
          .insert(orderToCreate)
          .returning("order_id");

        // Prepare order items for insertion
        const orderItemsToCreate = orderItems.map((item) => ({
          order_id: orderId.orderId,
          item_id: item.itemId,
          quantity: item.quantity,
        }));

        // Insert into `order_items` table
        await trx("order_items").insert(orderItemsToCreate);

        // Update inventory levels in `grocery_items` for each item
        for (const item of orderItems) {
          await trx("grocery_items")
            .where("item_id", item.itemId)
            .decrement("inventory_level", item.quantity);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  static async cancerOrder(orderId: string) {
    try {
      await this.queryBuilder().transaction(async (trx) => {
        // Retrieve order_items for the given orderId
        const orderItems = await trx("order_items")
          .where("order_id", orderId)
          .returning("*");

        if (!orderItems || orderItems.length === 0) {
          throw new Error("Order items not found");
        }

        // Restore inventory levels by incrementing the quantities in grocery_items

        for (const item of orderItems) {
          await trx("grocery_items")
            .where("item_id", item.itemId)
            .increment("inventory_level", item.quantity);
        }

        // Update the status of the order to 'canceled'
        await trx("orders")
          .where("order_id", orderId)
          .update({ status: "canceled" });

        // await trx("order_items").where("order_id", orderId).del();
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  static async getGroceries() {
    try {
      const groceries = await this.queryBuilder()
        .table("grocery_items")
        .where("inventory_level", ">", 0);
      if (groceries!.length === 0) {
        throw new NotFoundError("No groceries found");
      }
      return groceries;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
