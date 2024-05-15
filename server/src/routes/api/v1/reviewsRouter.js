import express from "express";

const reviewsRouter = new express.Router()

// reviewsRouter.delete("/:id", async (req, res) => {
//   try {
//     const review = await Review.query().findById(req.params.id)
//     await review.$relatedQuery("votes").delete()
//     await Review.query().deleteById(req.params.id)
//     const sandwich = await Sandwich.query().findById(review.sandwichId)
//     const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, req.user.id)
//     res.status(200).json({ sandwich: serializedSandwich })
//   } catch(error) {
//     console.log(error)
//     res.status(500).json({ error })
//   }
// })

// reviewsRouter.patch("/:id", async (req, res) => {
//   try {
//     const { title, body, starRating } = req.body
//     const existingReview = await Review.query().findById(req.params.id)
//     const updatedReview = {
//       ...existingReview,
//       title: title,
//       body: body,
//       starRating: starRating
//     }
//     const persistedUpdate = await Review.query().updateAndFetchById(req.params.id, updatedReview)
//     persistedUpdate.username = req.user.username
//     persistedUpdate.votes = await persistedUpdate.voteCount()
//     const vote = await Vote.query().where('userId', req.user.id).andWhere('reviewId', persistedUpdate.id)
//     persistedUpdate.voteStatus = vote[0].voteStatus
//     const sandwich = await Sandwich.query().findById(existingReview.sandwichId)
//     const serializedSandwich = await SandwichSerializer.summaryForShow(sandwich, req.user.id)
//     res.status(200).json({ review: persistedUpdate, sandwich: serializedSandwich })
//   } catch(error) {
//     if (error instanceof ValidationError) {
//       res.status(422).json( {errors: error.data })
//     } else {
//       res.status(500).json( { error } )
//     }
//   }
// })


export default reviewsRouter