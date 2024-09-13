import { Knex } from "knex";

const TABLE_NAME = "grocery_items";

/**
 * Delete existing entries and seed values for table grocery_items.
 *
 * @param   {Knex} knex
 * @returns {Promise<void>}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del() // Deletes all existing entries in grocery_items
    .then(() => {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {
          item_id: 1,
          name: "Apple",
          price: 1.5,
          inventory_level: 100,
          created_by: 1, // Assuming user with id=1 exists
        },
        {
          item_id: 2,
          name: "Banana",
          price: 0.5,
          inventory_level: 150,
          created_by: 1, // Assuming user with id=1 exists
        },
        {
          item_id: 3,
          name: "Milk",
          price: 2.75,
          inventory_level: 200,
          created_by: 1, // Assuming user with id=2 exists
        },
        {
          item_id: 4,
          name: "Bread",
          price: 3.5,
          inventory_level: 50,
          created_by: 1, // Assuming user with id=1 exists
        },
      ]);
    });
}
