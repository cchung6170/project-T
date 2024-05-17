import React, { useState } from 'react'
import SelectStarRating from './SelectStarRating'

const NewReviewForm = (props) => {

  const [reviewFormFields, setReviewFormFields] = useState({
    id: "",
    title: "",
    body: "",
    starRating: 1
  })

  const submitForm = (event) => {
    event.preventDefault()
    props.addReview(reviewFormFields)
  }

  const handleInputChange = (event) => {
    setReviewFormFields({
      ...reviewFormFields,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  return(
    <>
      <form className="form" onSubmit={submitForm}>
        <label> Star Rating:</label>
        <SelectStarRating reviewFormFields={reviewFormFields} setReviewFormFields={setReviewFormFields} />
        <label> Body:
          <input type='text' name='body' onChange={handleInputChange} value={reviewFormFields.body} />
        </label>
        <input className="button" type='submit' value='Submit' />
      </form>
    </>
  )
}

export default NewReviewForm