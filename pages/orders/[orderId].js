import nookies, { parseCookies } from "nookies"
import { Alert } from "@material-ui/lab"
import baseUrl from "../../utils/baseUrl"
import { getData } from "../../utils/fetchData"
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import { DataContext } from "../../store/GlobalState"
import {
  Grid,
  Button,
  Link,
  Typography,
  Box,
  Card,
  List,
  CardMedia,
  makeStyles,
  CardContent,
  CardActions,
  CircularProgress,
} from "@material-ui/core"
import Image from "next/image"
import { PayPalButton } from "react-paypal-button-v2"
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

const OrderId = (props) => {
  const { state, dispatch } = useContext(DataContext)
  const classes = useStyles()
  const order = props

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const subtotal = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )
  const { token } = parseCookies()
  const submitPayment = async (orderId, paymentResult) => {
    const res = await fetch(`${baseUrl}/api/orders/order/pay/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        paymentResult,
      }),
    })
    const result = await res.json()
    if (result.error) {
      console.log(result.error)
    } else {
      console.log("Pay saved")
      window.location.reload()
      dispatch({
        type: "ADD_CART",
        payload: {},
      })
    }
  }
  const router = useRouter()
  const { orderId } = router.query
  // console.log(orderId)
  const successPaymentHandler = (paymentResult) => {
    submitPayment(orderId, paymentResult)
  }

  return (
    <>
      <h1>Order {order._id}</h1>
      <Grid container>
        <Grid item md={8}>
          <Card>
            <Box padding="1rem">
              <Box>
                <List>
                  <Box>
                    <strong>Name: </strong> {order.user.firstName},{" "}
                    {order.user.lastName}
                  </Box>
                  <Box>
                    <strong>Email: </strong>
                    <a href={`mailto: ${order.user.email}`}>
                      {" "}
                      {order.user.email}
                    </a>
                  </Box>
                </List>
                <Typography>
                  <strong> Address:</strong>
                  {order.address.address}, {order.address.city} ,{" "}
                  {order.address.postalCode}, {order.address.country}
                </Typography>
              </Box>
              <hr />
              <Box>
                <Typography>
                  <strong>Payment Method: </strong> {order.paymentMethod},
                </Typography>
                <Typography>
                  {order.isPaid ? (
                    <Alert severity="success">Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert severity="warning">Not Paid</Alert>
                  )}
                </Typography>
              </Box>
              <hr />
              <Box>
                <List>
                  <strong>Order Items:</strong>{" "}
                  {order.orderItems === 0 ? (
                    <Alert>Order is empty</Alert>
                  ) : (
                    <List>
                      {order.orderItems.map((item, index) => (
                        <List key={index}>
                          <Grid container item>
                            <Grid item md={1} style={{ padding: "0rem" }}>
                              <Image
                                src={item.selectedFile}
                                height="50rem"
                                width="50rem"
                              />
                            </Grid>
                            <Grid item style={{ padding: "0.5rem" }}>
                              {item.title}
                            </Grid>
                            <Grid item md={4} style={{ padding: "0.5rem" }}>
                              {item.quantity} x £{item.price} = £
                              {item.quantity * item.price}
                            </Grid>
                          </Grid>
                        </List>
                      ))}
                    </List>
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
                    £{order.tax}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="textPrimary"
                    gutterBottom
                  >
                    £{order.total}
                  </Typography>
                </Grid>
                <CardActions>
                  {!order.isPaid && (
                    <List>
                      {/* {loadingPay && <Alert />}
                      {!sdkReady ? (
                        <Alert />
                      ) : ( */}
                      <PayPalButton
                        amount={order.total}
                        onSuccess={successPaymentHandler}
                      />
                      {/* )} */}
                    </List>
                  )}
                </CardActions>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderId

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const cookies = nookies.get(ctx)
  // const res = await getData(`orders/order/${OrderId}`)

  const { token } = cookies
  const { orderId } = ctx.query
  // console.log(token, ctx.query.orderId)

  const res = await fetch(`${baseUrl}/api/orders/order/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  const result = await res.json()

  // server side rendering
  return {
    props: result, // will be passed to the page component as props
    // pay: result2, // will be passed to the page component as props
  }
}
