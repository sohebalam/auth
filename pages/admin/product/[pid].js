import Link from "next/link"
import { useEffect, useState } from "react"
import baseUrl from "../../../utils/baseUrl"
import FileBase from "react-file-base64"
import { parseCookies } from "nookies"

import {
  Button,
  Container,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}))

const ProductId = ({ product }) => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [description, setDescription] = useState("")
  const classes = useStyles()
  const router = useRouter()
  useEffect(() => {
    setTitle(product.title)
    setPrice(product.price)
    setSelectedFile(product.selectedFile)
    setDescription(product.description)
  }, [])

  const { pid } = router.query
  // console.log(pid)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(title, price, selectedFile, description)
    const res = await fetch(`${baseUrl}/api/product/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        selectedFile,
        description,
      }),
    })
    const res2 = await res.json()
    if (res2.error) {
      console.log(res2.error)
    } else {
      console.log("Product saved")
    }
  }
  const clear = () => {
    setTitle("")
    setPrice("")
    setSelectedFile("")
    setDescription("")
  }
  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: "1rem" }}>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Edit a course</Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <TextField
            name="price"
            variant="outlined"
            label="Price"
            fullWidth
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
            }}
          />

          <TextField
            name="description"
            placeholder="Description"
            variant="outlined"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          ></TextField>

          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setSelectedFile(base64)}
            />
          </div>

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
export default ProductId

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx)
  if (!token) {
    const { res } = ctx
    res.writeHead(302, { Location: "/login" })
    res.end()
  }
  const { pid } = ctx.query

  const res = await fetch(`${baseUrl}/api/product/${pid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  const result = await res.json()
  // console.log(result)

  return {
    props: result,
  }
}
