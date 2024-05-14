const Model = require("./Model.js")

class Product extends Model{
  static get tableName() {
    return ""
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        
      }
    }
  }
}