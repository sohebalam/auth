import React, { useEffect, useState, useContext } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
// import { saveAddress } from "../../redux/actions/cartActions"
import Grid from "@material-ui/core/Grid"
import { useRouter } from "next/router"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CheckOutSteps from "../../components/CheckOutSteps"
import HomeWorkIcon from "@material-ui/icons/HomeWork"
import { DataContext } from "../../store/GlobalState"
import { Box } from "@material-ui/core"

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const AddressPage = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state
  const classes = useStyles()
  // const { shippingAddress } = cart
  const router = useRouter()
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_ADDRESS",
      payload: { address, city, postalCode, country },
    })
    router.push("/cart/payment")
  }

  return (
    <>
      <Typography variant="h3" component="h3">
        Cart{" "}
      </Typography>
      <Box display="flex" justifyContent="center">
        <CheckOutSteps step1 step2 />
      </Box>
      <Grid container>
        <Container component="main" maxWidth="sm">
          {/* <Grid container item>
            <CheckoutSteps step1 step2 />
          </Grid> */}

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HomeWorkIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Address
            </Typography>
            {/* {message && <Alert severity="error">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />} */}
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="address"
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    autoFocus
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="postalCode"
                    label="Post Code"
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    type="country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Continue
              </Button>

              <Grid container justify="flex-end"></Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </>
  )
}

export default AddressPage
