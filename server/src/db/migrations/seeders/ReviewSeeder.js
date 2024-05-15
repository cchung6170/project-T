import { Review } from "../../../models/index.js";

class ReviewSeeder {
  static async seed(){
    const reviewsData = [
      {
        // userId: 1,
        productId: 1,
        body: "Best pants ever",
        starRating: 5
      },
      {

      }
    ]

    for (const singleReview of reviewsData) {
      const currentReview = await Review.query().findOne(singleReview)
      if (!currentReview) {
        await Review.query().insert(singleReview)
      }
    }
  }
}

export default ReviewSeeder