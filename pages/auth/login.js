// import React, { useState, useContext, useEffect } from "react"
// // import Message from "../components/Message"
// import { Grid, Button, Link, CircularProgress } from "@material-ui/core"
// // import { useDispatch, useSelector } from "react-redux"
// // import { login } from "../actions/userActions"
// import Avatar from "@material-ui/core/Avatar"
// import CssBaseline from "@material-ui/core/CssBaseline"
// import TextField from "@material-ui/core/TextField"
// import FormControlLabel from "@material-ui/core/FormControlLabel"
// import Checkbox from "@material-ui/core/Checkbox"
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
// import Typography from "@material-ui/core/Typography"
// import { makeStyles } from "@material-ui/core/styles"
// import Container from "@material-ui/core/Container"
// import baseUrl from "../../utils/baseUrl"
// import { parseCookies } from "nookies"
// import cookie from "js-cookie"

// import { useRouter } from "next/router"

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }))

// const Login = ({ location, history }) => {
//   const { token } = parseCookies()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const router = useRouter()

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     const res = await fetch(`${baseUrl}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })

//     const res2 = await res.json()
//     if (res2.error) {
//       console.log(res2.error)
//     } else {
//       console.log(res2)
//       cookie.set("token", res2.token)
//       cookie.set("user", res2.user)
//       router.push("/")
//     }
//   }

//   const classes = useStyles()
//   // useEffect(() => {
//   //   if (Object.keys(auth).length !== 0) {
//   //     router.push("/")
//   //   }
//   // }, [auth])

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>

//         <form className={classes.form} noValidate onSubmit={submitHandler}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             value={password}
//             autoComplete="current-password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href={`/auth/register`} variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </Container>
//   )
// }
// export default Login
import Head from "next/head"
// import Header from "../../components/layout/Header"
// import styles from "../styles/Home.module.css"
import { getSession, signIn, useSession } from "next-auth/react"
import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons"
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Link from "next/link"
import TwitterIcon from "@material-ui/icons/Twitter"
import { useState } from "react"
import { loadUser, socialReg } from "../../redux/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Alert } from "@material-ui/lab"
import { wrapper } from "../../redux/store"
import { parseCookies } from "nookies"
import cookie from "js-cookie"

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

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()

  const profile = useSelector((state) => state.profile)

  const { dbUser } = profile

  // console.log(dbUser)

  const classes = useStyles()

  // const submitHandler = async (e) => {
  //   e.preventDefault()

  //   // console.log(email, password)
  //   // setLoading(true)
  //   const res = await signIn("credentials", {
  //     redirect: false,
  //     email,
  //     password,
  //   })
  //   dispatch(loadUser())
  //   setLoading(false)
  //   if (res.error) {
  //     setError(res.error)
  //     setLoading(false)
  //   } else {
  //     router.push("/")
  //   }
  // }
  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const res2 = await res.json()
    if (res2.error) {
      console.log(res2.error)
    } else {
      console.log(res2)
      cookie.set("token", res2.token)
      cookie.set("user", res2.user)
      router.push("/")
    }
  }
  if (session) {
    const { user } = session
    // console.log(user)

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: null,
    }
    if (!dbUser) {
      if (user.id) {
        dispatch(socialReg(userData))
        // console.log(userData)
      }
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid container>
        <Grid item sm={5}>
          {/* <Container
            // component="main"
            
            // style={{ marginLeft: "3rem" }}
          > */}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* {error && <Alert severity="error">{error}</Alert>} */}
            {error && <Alert severity="error">{error}</Alert>}
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {/* {loading && <CircularProgress />} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/user/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={`/user/register`} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* </Container> */}
        </Grid>
        <Grid item sm={1}></Grid>

        <Grid item xs={5}>
          {/* <Container maxWidth="xs"> */}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <TwitterIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "1rem" }}
            >
              Social Login
            </Typography>
            {/* <FacebookLoginButton onClick={() => signIn("facebook")} /> */}
            <GoogleLoginButton onClick={() => signIn("google")} />
            <TwitterLoginButton onClick={() => signIn("twitter")} />
            <LinkedInLoginButton onClick={() => signIn("linkedin")} />
            <GithubLoginButton onClick={() => signIn("github")} />
          </div>
          {/* </Container> */}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
