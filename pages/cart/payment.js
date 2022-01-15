import React, { useState, useContext, useEffect } from "react"

import {
  Grid,
  Button,
  Link,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Container,
  CssBaseline,
} from "@material-ui/core"

import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
// import { savePaymentMethod } from "../actions/cartActions"
import CheckOutSteps from "../../components/CheckOutSteps"

import { DataContext } from "../../store/GlobalState"
import { useRouter } from "next/router"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
export default function PaymentScreen() {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { address } = state

  if (!address) {
    router.push("/shipping")
  }

  const classes = useStyles()
  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_PAYMENT",
      payload: { data: paymentMethod },
    })
    router.push("/cart/placeorder")
  }

  return (
    <Grid container>
      <Container component="main" maxWidth="sm">
        <Grid
          container
          item
          style={{ marginBottom: "2rem", marginTop: "2rem" }}
        >
          <CheckOutSteps step1 step2 step3 />
        </Grid>
        <Container component="main" maxWidth="xs">
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>

          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <FormControl component="fieldset">
              <RadioGroup
                name="Payment Method"
                value={paymentMethod}
                // onChange={(e) => setPayment(e.target.value)}
              >
                <FormControlLabel
                  value="PayPal"
                  id="PayPal"
                  control={<Radio />}
                  label="PayPal or Credit Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <FormControlLabel
                  value="Stripe"
                  id="Stripe"
                  control={<Radio />}
                  label="Stripe (Not Avaiable)"
                  disabled
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </RadioGroup>
            </FormControl>

            <Box marginTop="2rem">
              <Button type="submit" variant="contained">
                Continue
              </Button>
            </Box>
          </form>
        </Container>
      </Container>
    </Grid>
  )
}
