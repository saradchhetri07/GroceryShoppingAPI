// migrations/20240915_create_orders_table.js

import { Knex } from "knex";

const TABLE_NAME = "orders";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("order_id").primary(); // Primary key

    table.bigInteger("user_id").unsigned().notNullable(); // Foreign key to users table
    table.timestamp("order_date").notNullable().defaultTo(knex.fn.now()); // Order date
    table.string("status").notNullable(); // Order status
    table.integer("total_quantity").notNullable(); // Total quantity
    table.integer("total_price").notNullable(); // Total price
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Referential integrity
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
