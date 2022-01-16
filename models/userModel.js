import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root", "Hello World !"],
    },
    update: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

mongoose.models = {}
export default // mongoose.models.User ||
mongoose.model("User", userSchema)
