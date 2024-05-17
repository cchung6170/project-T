const Model = require("./Model.js")

class Review extends Model{
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["body", "starRating", "productId"],
      properties: {
        body: {type: "string", minLength: 1},
        starRating: {type: ["integer", "string"], minimum: 1},
        // userId: {type: ["integer", "string"]},
        productId: {type: ["integer", "string"]}
      }
    }
  }

  static get relationMappings() {
    const { User, Product } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "reviews.productId",
          to: "product.id"
        }
      }
    }
  }
}

module.exports = Review