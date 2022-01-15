import connectDB from "../../../utils/connectDB"
import Products from "../../../models/productModel"
// import auth from "../../../middleware/auth"
import { deleteProduct, updateProduct } from "./productCont"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res)
      break
    case "PUT":
      await updateProduct(req, res)
      break
    case "DELETE":
      await deleteProduct(req, res)
      break
  }
}

const getProduct = async (req, res) => {
  try {
    const { pid } = req.query

    const product = await Products.findById({ _id: pid })
    if (!product)
      return res.status(400).json({ err: "This product does not exist." })

    res.json({ product })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
