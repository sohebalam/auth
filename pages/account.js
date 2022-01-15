import { parseCookies } from "nookies"
import baseUrl from "../utils/baseUrl"
import { useEffect, useRef, useState } from "react"
// import UserRoles from '../components/UserRoles'

import Link from "next/link"

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
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

const Account = ({ orders }) => {
  const classes = useStyles()
  const orderCard = useRef(null)
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""

  // console.log(orders, user)

  useEffect(() => {
    // M.Collapsible.init(orderCard.current)
  }, [])

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  function ControlledAccordions() {}
  const OrderHistory = () => {
    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>

              <TableCell>DATE</TableCell>
              <TableCell>TOTAL PRICE</TableCell>
              <TableCell>PAID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>

                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>£{order.total}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <Typography>{order.paidAt.substring(0, 10)}</Typography>
                  ) : (
                    <Typography>Not Paid</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order._id}`}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Order Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  }

  return (
    <div className="container">
      <div
        className="center-align white-text"
        style={{
          marginTop: "10px",
          backgroundColor: "#f51174",
          padding: "5px",
        }}
      >
        <h4>
          {user.firstName} {user.lastName} {user.email}
        </h4>
        {"  "}
      </div>
      <h3>Order History</h3>
      {orders.length == 0 ? (
        <div className="container">
          <h5>Your have no order History</h5>
        </div>
      ) : (
        <OrderHistory />
      )}
      {/* {user.role == "root"
            &&<UserRoles />
            }  */}
    </div>
  )
}

export default Account
export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx)
  if (!token) {
    const { res } = ctx
    res.writeHead(302, { Location: "/login" })
    res.end()
  }

  const res = await fetch(`${baseUrl}/api/orders/order`, {
    headers: {
      Authorization: token,
    },
  })
  const res2 = await res.json()
  // console.log(res2)

  return {
    props: { orders: res2 },
  }
}
