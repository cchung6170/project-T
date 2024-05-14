/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("products", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable()
    table.text("description")
    table.double("price").notNullable()
    table.integer("discount")
    table.integer("quantity").unsigned().notNullable()
    table.boolean("availability").notNullable().defaultTo(false)
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("products")
};
