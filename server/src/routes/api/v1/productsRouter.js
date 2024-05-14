import express from "express"
import { Product } from "../../../models/index.js"

const productsRouter = new express.Router()

productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.query()
    res.status(200).json({ products: products })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

productsRouter.get("/:id", async (req, res) => {
  try {
    let userId
    if (req.user) {
      userId = parseInt(req.user.id)
    }
    const product = await Product.query().findById(req.params.id)
    // const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, userId)
    res.status(200).json({ product: product })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})



// productsRouter.get("/:id", (req,res) => {
//   try {
//     let userId
//     if (req.user) {
//       userId = parseInt(req.user.id)
//     }
//     const sandwich = await .query().findById(req.params.id)
//     const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, userId)
//     res.status(200).json({ sandwich: serializedSandwich })
//   } catch(error) {
//     res.status(500).json({ errors: error })
//   }
// })


export default productsRouter