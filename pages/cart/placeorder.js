import React, { useEffect, useContext, useState } from "react"

import {
  Grid,
  Button,
  Typography,
  Box,
  Card,
  List,
  makeStyles,
  CardContent,
  CardActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core"
import CheckoutSteps from "../../components/CheckOutSteps"
import { Alert } from "@material-ui/lab"
import { useRouter } from "next/router"
// import { orderCreateReducer } from "../../reducers/orderReducer"
import { DataContext } from "../../store/GlobalState"
import CartItem from "../../components/CartItem"
import baseUrl from "../../utils/baseUrl"
import { parseCookies } from "nookies"
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const PlaceOrderPage = () => {
  const { token } = parseCookies()
  // console.log(token)
  // const cookieuser = parseCookies()
  // const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""
  const [subtotal, setSubTotal] = useState(0)
  // const [jwttoken, setJwttoken] = useState(token)

  const classes = useStyles()
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { address, cart, payment } = state

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)

      setSubTotal(res)
    }
    getTotal()
  }, [cart])

  const placeOrderHandler = async (e) => {
    // e.preventDefault()

    const res = await fetch(`${baseUrl}/api/orders/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        cart: cart,
        address: address,
        payment: payment,
        subtotal,
        tax,
        total,
      }),
    })

    const result = await res.json()
    if (result.error) {
      console.log(result.error)
    } else {
      console.log(result.order, result.success)
      if (result.success === true) {
        const { order } = result
        router.push(`/orders/${order._id}`)
      }
    }
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // let subtotal = 0
  // subtotal = addDecimals(
  //   cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  // )
  let tax = 0
  let total = 0
  tax = addDecimals(Number((subtotal * tax) / 100).toFixed(2))
  total = (Number(subtotal) + Number(tax)).toFixed(2)

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom="1rem"
        marginTop="1rem"
      >
        <CheckoutSteps step1 step2 step3 step4 />
      </Box>

      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
              <Box>
                <Typography>
                  <strong> Address:</strong> {address.street}, {address.city} ,{" "}
                  {address.postalCode}, {address.country}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Payment Method: </strong> {payment.data},
                </Typography>
              </Box>
              <hr />
              <Box>
                <List>
                  <strong>Order Items:</strong>{" "}
                  {cart === 0 ? (
                    <Alert severity="danger">Your Cart is empty</Alert>
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell size="small">Course Title</TableCell>
                          <TableCell size="small">
                            <Box marginLeft="2.5rem">Quantity</Box>
                          </TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Remove</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cart.map((item) => (
                          <CartItem
                            key={item._id}
                            item={item}
                            dispatch={dispatch}
                            cart={cart}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  )}{" "}
                </List>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card className={classes.root} style={{ marginLeft: "1rem" }}>
            <CardContent>
              <Grid container style={{ padding: "0.25rem" }}>
                <Box style={{ marginInlineStart: "2.5rem" }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    color="textPrimary"
                    gutterBottom
                  >
                    Order Summary
                  </Typography>
                </Box>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Price of Items:
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Tax:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    Total:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{subtotal}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{tax}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{total}
                  </Typography>
                </Grid>
              </Grid>
              {/* {error && <Alert severity="error">{error}</Alert>} */}
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  // value={jwttoken}
                  // onChange={(e) => setJwttoken(e.target.value)}
                  onClick={() => placeOrderHandler(token)}
                >
                  Place Order
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PlaceOrderPage
