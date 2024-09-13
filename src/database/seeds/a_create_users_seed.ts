import { Knex } from "knex";
import bcrypt from "bcryptjs";

const TABLE_NAME = "users";

/**
 * Seed the users table.
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
      id: 1,
      name: "Sarad Chhetri",
      email: "saradchhetri20690@gmail.com",
      password: await bcrypt.hash("admin", 10), // Hash the password
      role: "superuser", // Superuser type
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      password: await bcrypt.hash("hashed", 10), // Ensure to hash the password before inserting
      role: "user",
      created_at: knex.fn.now(),
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: await bcrypt.hash("hashed", 10), // Ensure to hash the password before inserting
      role: "user",
      created_at: knex.fn.now(),
    },
    {
      id: 4,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      password: await bcrypt.hash("hashed", 10), // Ensure to hash the password before inserting
      role: "user",
      created_at: knex.fn.now(),
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      password: await bcrypt.hash("hashed", 10), // Ensure to hash the password before inserting
      role: "user",
      created_at: knex.fn.now(),
    },
  ]);
}
