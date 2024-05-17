import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ErrorList from "./ErrorList"
import translateServerError from "../services/translateServerErrors"
import ReviewTile from "./ReviewTile";
import NewReviewForm from "./NewReviewForm";

const ProductShow = (props) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    availability: "",
    reviews: []
  })
  // console.log(product)
  // debugger
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLogInMessage, setShowLogInMessage] = useState(false);
  const [errors, setErrors] = useState({})

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/v1/products/${id}`)
      if (!response.ok) {
        const errorMessage = `Fetch error status ${response.status}: ${response.statusText}`
        const newError = new Error(errorMessage)
        throw newError
      } else {
        const parsedData = await response.json()
        console.log(parsedData)
        setProduct(parsedData.product)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getProduct()
  }, [])

  const newReviewClick = () => {
    if (props.user) {
      if (showReviewForm) {
        setShowReviewForm(false);
      } else {
        setShowReviewForm(true);
      }
    } else {
      setShowReviewForm(false);
      setShowLogInMessage(true);
    }
  };

  const addReview = async (newReviewPayload) => {
    try {
      const response = await fetch(`/api/v1/product/${id}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewPayload),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const responseBody = await response.json();
        const newReview = responseBody.review;
        setProduct({
          ...responseBody.product,
          reviews: [...product.reviews, newReview],
        })
        setErrors({})
        setShowReviewForm(false)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  
  const price = product.price
  const discount = product.discount
  let discountedPrice
  let fixedDiscountPrice
  if(typeof discount === "number"){
    if(discount != 0){
      let discountnum = (100-discount)/100
      discountedPrice = price*discountnum
    } else {
      discountedPrice = price
    }
    fixedDiscountPrice = discountedPrice.toFixed(2)
  }  

  const reviewList = product.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        user={props.user}
        product={product}
        setProduct={setProduct}
      />
    )
  })
  console.log(reviewList)

  return (
    <div className="main-background">
      <h2>{product.name}</h2>
      <h4>{product.description}</h4>
      {fixedDiscountPrice}

      <div className="add-review-section">
        <p className="button" onClick={newReviewClick}>
          Add Review
        </p>
        <ErrorList errors={errors} />
          {showLogInMessage ? <p>You need to be logged in to leave a review</p> : null}
          {showReviewForm ? (
            <NewReviewForm setShowReviewForm={setShowReviewForm} addReview={addReview} setErrors={setErrors}/>
          ) : null}
      </div>
      <h4 className="reviews-header">Reviews</h4>
      {reviewList}

    </div>
  )

}

export default ProductShow