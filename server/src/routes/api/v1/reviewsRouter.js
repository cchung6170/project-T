import express from "express";
import { Product } from "../../../models/index.js";
import { ValidationError } from "objection";

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const review = await Review.query().findById(req.params.id)
    await review.$relatedQuery("votes").delete()
    await Review.query().deleteById(req.params.id)
    const product = await Product.query().findById(review.productId)
    // const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, req.user.id)
    res.status(200).json({ product: product })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

reviewsRouter.patch("/:id", async (req, res) => {
  try {
    const { body, starRating } = req.body
    const existingReview = await Review.query().findById(req.params.id)
    const updatedReview = {
      ...existingReview,
      body: body,
      starRating: starRating
    }
    const persistedUpdate = await Review.query().updateAndFetchById(req.params.id, updatedReview)
    persistedUpdate.username = req.user.username
    const product = await Product.query().findById(existingReview.sandwichId)
    // const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, req.user.id)
    res.status(200).json({ review: persistedUpdate, product: product })
  } catch(error) {
    if (error instanceof ValidationError) {
      res.status(422).json( {errors: error.data })
    } else {
      res.status(500).json( { error } )
    }
  }
})


export default reviewsRouter