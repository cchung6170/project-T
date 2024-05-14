/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("reviews", (table) => {
    table.bigIncrements("id");
    table.integer("userId").notNullable().unsigned().index().references("users.id")
    table.integer("productId").notNullable().unsigned().index().references("products.id")
    table.text("body").notNullable()
    table.integer("starRating").notNullable().unsigned()

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("reviews")
};
