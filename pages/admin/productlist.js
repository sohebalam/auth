import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Grid,
} from "@material-ui/core"
import nookies, { parseCookies } from "nookies"
import baseUrl from "../../utils/baseUrl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Alert } from "@material-ui/lab"
import { useRouter } from "next/router"
import Image from "next/image"
const Productlist = (props) => {
  const [products, setProducts] = useState(props.products)
  // console.log(products)

  const deleteHandler = async (pid) => {
    if (window.confirm("Are you sure")) {
      const { token } = parseCookies()
      const res = await fetch(`${baseUrl}/api/product/${pid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      const result = await res.json()
      const { error, message } = result
      // setMessageTwo(success)
      console.log("success", error, message, res)
    }
  }
  return (
    <Grid container>
      <Grid container item>
        <Grid item xs={10}>
          <h1>List of Products </h1>
          {/* {(message || messageTwo) && (
          <Alert severity="error">{message || messageTwo}</Alert>
        )} */}
        </Grid>
        <Grid item style={{ marginTop: "1rem" }}>
          <Link href="/admin/upload">
            <Button variant="outlined">Upload Course</Button>
          </Link>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product._id}</TableCell>
              <TableCell>
                {/* <Image
                  src={product.selecetedFile}
                  height="40rem"
                  width="40rem"
                /> */}
                <Image
                  src={product.selectedFile}
                  height="100rem"
                  width="200rem"
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>

              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Link
                  href={`/admin/product/${product._id}`}
                  // as={`/admin/useredit/${userId}`}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteHandler(product._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default Productlist

// export async function getServerSideProps(ctx) {
//     // console.log(ctx)
//     const cookies = nookies.get(ctx)

//     const { token } = cookies

//     const res = await fetch(`${baseUrl}/api/product/products`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     })
//     const result = await res.json()
//     console.log(result)
//     // server side rendering
//     return {
//       props: result, // will be passed to the page component as props
//       // pay: result2, // will be passed to the page component as props
//     }
//   }

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/product/products`)
  const data = await res.json()

  return {
    props: {
      products: data,
    },
  }
}
