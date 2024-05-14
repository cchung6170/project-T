import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ErrorList from "./ErrorList"
import translateServerError from "../services/translateServerErrors"

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
  const { id } = useParams()
  const getProduct = async () => {
    try {
      const response = await fetch(`/api/v1/products/${id}`)
      if (!response.ok) {
        const errorMessage = `Fetch error status ${response.status}: ${response.statusText}`
        const newError = new Error(errorMessage)
        throw newError
      } else {
        const parsedData = await response.json()
        setProduct(parsedData.product)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getProduct()
  }, [])
  
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

  return (
    <div>
      <h2>{product.name}</h2>
      <h4>{product.description}</h4>
      {fixedDiscountPrice}

    </div>
  )

}

export default ProductShow