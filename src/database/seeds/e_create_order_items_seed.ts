import { Knex } from "knex";

const TABLE_NAME = "order_items";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // Inserts seed entries
  await knex(TABLE_NAME).insert([
    {
      order_id: 1, // Foreign key to orders
      item_id: 1, // Foreign key to grocery_items
      quantity: 3, // Quantity of the item in the order
    },
    {
      order_id: 1, // Foreign key to orders
      item_id: 2, // Foreign key to grocery_items
      quantity: 2, // Quantity of the item in the order
    },
    {
      order_id: 2, // Foreign key to orders
      item_id: 3, // Foreign key to grocery_items
      quantity: 5, // Quantity of the item in the order
    },
  ]);
}
