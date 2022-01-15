import nookies, { parseCookies } from "nookies"
import baseUrl from "../../../utils/baseUrl"

import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

import { Alert } from "@material-ui/lab"
import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"

const Orders = ({ orders }) => {
  //   console.log(props.orders)
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>FIRSTNAME</TableCell>
            <TableCell>LASTNAME</TableCell>
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
              <TableCell>{order.user && order.user.firstName}</TableCell>
              <TableCell>{order.user && order.user.lastName}</TableCell>
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

export default Orders

export async function getServerSideProps(ctx) {
  // console.log(ctx)
  const cookies = nookies.get(ctx)

  const { token } = cookies

  const res = await fetch(`${baseUrl}/api/orders/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  const result = await res.json()
  // console.log(result)
  // server side rendering
  return {
    props: result, // will be passed to the page component as props
    // pay: result2, // will be passed to the page component as props
  }
}
