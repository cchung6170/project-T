import React, { useState, useEffect } from "react";
import ErrorList from "./ErrorList";
import ProductTile from "./ProductTile";

const ProductList = (props) => {
  const [products, setProducts] = useState([])
  console.log(products)
  const getProducts = async() => {
    try {
      const response = await fetch("/api/v1/products")
      if (!response) {
        return (<h3>Loading content...</h3>)
      } else {
        const parsedData = await response.json()
        setProducts(parsedData.products)
      }
      console.log(parsedData.products)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const productsList = products.map(product => {
    return <ProductTile key={product.id} product={product}/>
  })

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        {productsList}
      </div>
    </div>
  )
}

export default ProductList