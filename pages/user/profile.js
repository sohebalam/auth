import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  CssBaseline,
  makeStyles,
  TextField,
} from "@material-ui/core"
import { loadUser } from "../../redux/actions/userActions"

import { useState } from "react"
import { wrapper } from "../../redux/store"
import { getSession } from "next-auth/react"

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

function Profile({ session }) {
  const [update, setUpdate] = useState("")

  console.log(session.user.email)

  const classes = useStyles()

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log(update)

    const res = await fetch(`/api/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        update,
      }),
    })
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="update"
            label="update"
            name="update"
            autoComplete="udpate"
            autoFocus
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      console.log("login", session)

      store.dispatch(loadUser(req.headers.cookie, req))
      return {
        props: { session },
      }
    }
)

export default Profile
