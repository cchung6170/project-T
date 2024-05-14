const Model = require("./Model.js")

class Product extends Model{
  static get tableName() {
    return "products"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "availability", "quantity"],
      properties: {
        name: {type: "string", minLength: 3, maxLength: 255},
        description: {type: "string", minLength: 1, maxLength: 1000},
        price: {type: "number", minimum: 0.01},
        discount: {type: "integer", minimum: 0, maximum: 100},
        quantity: {type: "integer", minimum: 0},
        availability: {type: "boolean"}
      }
    }
  }
}

module.exports = Product