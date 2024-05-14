import { Product } from "../../../models/index.js";

class ProductSeeder {
  static async seed() {
    const productsData = [
      {
        name: "Jeans",
        description: "Standard Denim Jeans",
        price: 49.99,
        quantity: 5,
        availability: true
      }
    ]

    for (const singleProduct of productsData) {
      const currentProduct = await Product.query().findOne(singleProduct)
      if (!currentProduct) {
        await Product.query().insert(singleProduct)
      }
    }
  }
}

export default ProductSeeder