import connectDB from "../../../utils/connectDB"
import User from "../../../models/userModel"
import bcrypt from "bcryptjs"

connectDB()

export default async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(422).json({ error: "please ass all the fields" })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(422)
        .json({ error: "user already exists with that email" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()

    res.status(201).json({ message: "signup success" })
  } catch (err) {
    console.log(err)
  }
}
