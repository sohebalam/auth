import connectDB from "../../../utils/connectDB"
import Product from "../../../models/productModel"
import Authenticated from "../../../utils/Authenticated"
connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallProducts(req, res)
      break
    case "POST":
      await saveProduct(req, res)
      break
  }
}

const getallProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    console.log(err)
  }
}

const saveProduct = async (req, res) => {
  const { title, price, description, selectedFile } = req.body
  try {
    if (!title || !price || !description || !selectedFile) {
      return res.status(422).json({ error: "Please add all the fields" })
    }
    const product = await new Product({
      title,
      price,
      description,
      selectedFile,
    }).save()
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: "internal server error" })
    console.log(err)
  }
}
