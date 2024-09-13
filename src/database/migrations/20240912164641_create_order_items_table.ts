import { Knex } from "knex";

const TABLE_NAME = "order_items";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("order_item_id").primary(); // Primary key

    table.bigInteger("order_id").unsigned().notNullable(); // Foreign key to orders table
    table.bigInteger("item_id").unsigned().notNullable(); // Foreign key to grocery_items table
    table.integer("quantity").notNullable(); // Quantity of the item in the order

    table
      .foreign("order_id")
      .references("order_id")
      .inTable("orders")
      .onDelete("CASCADE"); // Referential integrity
    table
      .foreign("item_id")
      .references("item_id")
      .inTable("grocery_items")
      .onDelete("CASCADE"); // Referential integrity
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
