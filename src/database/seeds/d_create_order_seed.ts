import { Knex } from "knex";

const TABLE_NAME = "orders";

/**
 * Delete existing entries and seed values for table orders.
 *
 * @param   {Knex} knex
 * @returns {Promise<void>}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del() // Deletes all existing entries in the orders table
    .then(() => {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {
          order_id: 1,
          user_id: 2, // Assuming user with id=1 exists
          order_date: knex.fn.now(),
          status: "pending", // Sample status
          total_quantity: 5,
          total_price: 75, // Sample total price
        },
        {
          order_id: 2,
          user_id: 3, // Assuming user with id=2 exists
          order_date: knex.fn.now(),
          status: "completed", // Sample status
          total_quantity: 3,
          total_price: 45, // Sample total price
        },
        {
          order_id: 3,
          user_id: 4, // Another order by user 1
          order_date: knex.fn.now(),
          status: "shipped", // Sample status
          total_quantity: 10,
          total_price: 150, // Sample total price
        },
      ]);
    });
}
