import React from "react";
import { Link } from 'react-router-dom'

const ProductTile = (props) => {
  
  return (
    <div>
      <h4>{props.product.name}</h4>
    </div>
  )
}

export default ProductTile