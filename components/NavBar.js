import React, { useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"

// import logo from "../image/v3.jpg"
// import logo from "../image/v3.png"
import Image from "next/image"
import { Button, Typography, Link, Box, Badge } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import AssignmentIcon from "@material-ui/icons/Assignment"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { loadUser } from "../redux/actions/userActions"

import cookie from "js-cookie"
import { useRouter } from "next/router"

import { parseCookies } from "nookies"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function NavBar() {
  const cookieuser = parseCookies()
  const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""

  const { data: session } = useSession()

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const router = useRouter()
  const classes = useStyles()
  const logoutHandler = () => {
    cookie.remove("token")
    cookie.remove("user")
    router.push("/auth/login")
    signOut()
  }
  const AUser = user || dbUser || session?.user

  const handleSignout = (e) => {
    e.preventDefault()
    logoutHandler()
    // router.push("/user/login")
  }

  return (
    <div>
      {/* <Container> */}
      <AppBar position="static" style={{ color: "primary" }}>
        <Toolbar>
          <Link href="/">
            <IconButton>
              <Image src="/v3.png" alt="me" width="45" height="45" />
              {/* <img src="../public/v3.png" /> */}
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            OpenFreeUni
          </Typography>
          <>
            {/* {Object.keys(auth).length ? ( */}
            <>
              {AUser && (
                <>
                  <div
                    style={{
                      marginRight: "0.25rem",
                      marginLeft: "0.75rem",
                      marginTop: "0.75",
                    }}
                  >
                    <Typography style={{ marginTop: "0.25rem" }}>
                      Hello {user?.firstName} {user?.lastName} {AUser?.name}
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginRight: "0.25rem",
                      marginLeft: "0.75rem",
                      marginTop: "0.75",
                    }}
                  >
                    {/* <ProfileMenu user={user} /> */}
                  </div>
                </>
              )}

              <Box
                style={{
                  marginTop: "0.25rem",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                {/* <Link style={{ color: "white" }} href="/cart/cart">
                  <Button color="inherit" style={{ marginRight: "0.7rem" }}>
                    <Badge
                      badgeContent={cart?.length}
                      color="secondary"
                      style={{ marginRight: "0.25rem" }}
                    >
                      <ShoppingCartIcon style={{ marginRight: "0.25rem" }} />
                    </Badge>
                    Cart
                  </Button>
                </Link> */}

                {AUser ? (
                  <Button
                    color="inherit"
                    onClick={logoutHandler}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <ExitToAppIcon style={{ marginRight: "0.25rem" }} />
                    LogOut
                  </Button>
                ) : (
                  <>
                    <Link style={{ color: "white" }} href="/auth/register">
                      <Button color="inherit">
                        <AssignmentIcon style={{ marginRight: "0.25rem" }} />
                        Register
                      </Button>
                    </Link>
                    <Link style={{ color: "white" }} href="/auth/login">
                      <Button color="inherit">
                        <PersonIcon style={{ marginRight: "0.25rem" }} />
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </>

            <> </>
          </>
        </Toolbar>
      </AppBar>
      {/* </Container> */}
    </div>
  )
}
