// migrations/20240915_create_grocery_items_table.js

import { Knex } from "knex";

const TABLE_NAME = "grocery_items";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("item_id").primary(); // Primary key

    table.string("name").notNullable(); // Item name
    table.decimal("price", 10, 2).notNullable(); // Item price
    table.integer("inventory_level").notNullable(); // Inventory level

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()); // Timestamp when created
    table.timestamp("updated_at").nullable(); // Timestamp when updated
    // Foreign key 'created_by' references 'id' in the 'users' table
    table
      .bigInteger("created_by")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
