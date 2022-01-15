import React, { useEffect, useState, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  List,
  ListItem,
  Container,
} from "@material-ui/core/"
import Link from "next/link"
import { DataContext } from "../store/GlobalState"
import { addToCart } from "../store/Actions"

const useStyles = makeStyles({
  root: {
    height: 200,
  },
})

const ProductCard = ({ product }) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  useEffect(() => {
    const cart_update = JSON.parse(localStorage.getItem("cart_update"))

    if (cart_update) dispatch({ type: "ADD_CART", payload: cart_update })
  }, [])

  useEffect(() => {
    localStorage.setItem("cart_update", JSON.stringify(cart))
  }, [cart])

  //   const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (user) {
      //   dispatch(likeProduct(product._id))
      //   history.go(0)
    }
  }
  const classes = useStyles()

  //   useEffect(() => {}, [product.likes, dispatch, history])

  return (
    <>
      <Card style={{ height: "100%", padding: "0.75rem" }}>
        <Link href={`/product/${product._id}`}>
          {/* <Container> */}
          <CardActionArea>
            <CardMedia
              className={classes.root}
              image={product.selectedFile}
              title={product.title}
            />
            <CardHeader title={product.title} subheader={product.description} />
          </CardActionArea>
        </Link>
        <List>
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "0.8rem" }}
              onClick={() => dispatch(addToCart(product, cart))}
            >
              {/* <Link
                href={`/product/${product._id}`}
                style={{ color: "white" }}
                underline="none"
              > */}
              Buy Now
              {/* </Link> */}
            </Button>
            <Typography
              style={{ color: "black", marginLeft: "0.5rem" }}
              variant="h5"
            >
              £{product.price}
            </Typography>

            {/* <Button onClick={submitHandler} disabled={!user}>
              <Likes product={product} />
            </Button> */}
          </ListItem>
        </List>
        {/* </Container> */}
      </Card>
    </>
  )
}

export default ProductCard
