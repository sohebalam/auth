import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  selectedFile: { type: String, required: true },
  date: {
    type: Date,
  },
  creator: String,
  tags: [String],
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})
mongoose.models = {}
const Product = mongoose.model("Product", productSchema)

export default Product
