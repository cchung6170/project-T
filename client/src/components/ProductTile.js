import React from "react";
import { Link } from 'react-router-dom'

const ProductTile = (props) => {
  
  return (
    <div>
      <Link className="" to={`/products/${props.product.id}`}>
        {props.product.name}
      </Link>
    </div>
  )
}

export default ProductTile