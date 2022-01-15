import { Container, Grid } from "@material-ui/core"
import { useState } from "react"
import baseUrl from "../utils/baseUrl"

import ProductItem from "../components/ProductCard"

export default function Home(props) {
  const [products, setProducts] = useState(props.products)
  // console.log(products)

  return (
    <>
      <h1>Latest Courses</h1>
      <Grid>
        {products?.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          <Grid container spacing={2} direction="row">
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={4}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/product/products`)
  const data = await res.json()

  return {
    props: {
      products: data,
    },
  }
}
