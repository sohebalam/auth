import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import User from "../models/userModel"
// import { Social } from "../socialModel"
import absoluteUrl from "next-absolute-url"
import connectDB from "../connectDB"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"

export const registerUser = catchAsyncErrors(async (req, res) => {
  // console.log(req.method)

  const { name, email, password, conPassword } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" })
  }

  if (password !== conPassword) {
    return res.status(400).json({ message: "Passwords do not match" })
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email" })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: "user exists" })
  }

  const salt = await bcrypt.genSalt(12)
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, salt),
  })

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  })
})

export const currentUserProfile = catchAsyncErrors(async (req, res) => {
  // console.log("here")

  if (req.user) {
    res.status(200).send(req.user)
  }
})

export const updateProfile = async (req, res) => {
  // console.log(req.method)

  console.log(req.body.update, req.body.email)

  let user = await User.findOneAndUpdate(
    { email: req.body.email },
    { update: req.body.update },
    {
      new: true,
    }
  )

  console.log(user)

  // await User.updateOne(req.body.email, { udapte: req.body.update })
  // let user = await User.findOneAndUpdate(
  //   req.body.email,
  //   { update: req.body.update },
  //   {
  //     new: true,
  //   }
  // )

  // let user = await User.updateOne(
  //   { email: req.body.email },
  //   { update: req.body.update }
  // )
  // // This will update `doc` age to `59`, even though the doc changed.
  // await user.save()
  // console.log(user)

  // if (user) {
  //   user.update = req.method.update
  //   // await user.save()
  // }
}

export const forgotPassword = async (req, res) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body

  // console.log(email)

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "email doesn't exist" })
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    user.resetToken = token
    // console.log(user)
    await user.save()

    const { origin } = absoluteUrl(req)

    const link = `${origin}/user/reset/${token}`
    // HTML Message
    const message = `

      <div>Click the link below to reset your password or if the link is not working, please paste it into your browser</div><br/>
      <div>${link}</div>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      })

      res.status(200).json({
        message: `Email Sent to ${user.email}, please check your email`,
      })
    } catch (err) {
      console.log(err)

      user.resetToken = undefined

      await user.save()

      return res.status(500).json({ messsage: "Email could not be sent" })
    }
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (req, res) => {
  const { resetToken } = req.query

  const { password, conPassword } = req.body

  if (password !== conPassword) {
    return res.status(400).json({ message: "Passwords do not match be" })
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" })
  }

  if (resetToken) {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET)
    req.user = decoded
  }

  try {
    const user = await User.findById(req.user._id)

    if (user) {
      const salt = await bcrypt.genSalt(10)
      if (req.body.password) {
        if (req.body.password < 6) {
          return res
            .status(400)
            .json({ message: "password must be at least 6 characters" })
        }
        user.password = await bcrypt.hash(req.body.password, salt)
      }
      user.resetToken = undefined
      await user.save()
      return res.status(200).json({
        message: `success in updating user`,
      })
    }
  } catch (error) {
    res.status(500)
    throw new Error("Server Error")
  }
}

export const socialRegister = catchAsyncErrors(async (req, res) => {
  const { name, email, password, id } = req.body

  // console.log(req.body)
  if (req.body.id) {
    const userExists = await User.findOne({ socialId: req.body.id })

    // res.status(403).json({
    //   message: "Email exists please login",
    // })

    if (userExists) {
      return
    }
  }
  if (password) {
    var salt = bcrypt.genSaltSync(10)
    var hashPassword = bcrypt.hashSync(password, salt)
  }

  const user = await User.create({
    socialId: id,
    name,
    email,
    password: hashPassword || "",
  })

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  })
})

//google

export const registerSocial = catchAsyncErrors(async (req, res) => {
  console.log(req.method)

  // const { name, email, password, id } = req.body

  // // console.log(req.body)
  // if (req.body.id) {
  //   const userExists = await User.findOne({ socialId: req.body.id })

  //   // res.status(403).json({
  //   //   message: "Email exists please login",
  //   // })

  //   if (userExists) {
  //     return
  //   }
  // }
  // if (password) {
  //   var salt = bcrypt.genSaltSync(10)
  //   var hashPassword = bcrypt.hashSync(password, salt)
  // }

  // const user = await User.create({
  //   socialId: id,
  //   name,
  //   email,
  //   password: hashPassword || "",
  // })

  // res.status(200).json({
  //   success: true,
  //   message: "Account Registered successfully",
  // })
})

export const allAdminUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

export const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id)

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 400))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

export const deleteUser = catchAsyncErrors(async (req, res) => {
  // console.log(req.method, req.query.id)
  const user = await User.findByIdAndDelete(req.query.id)

  // console.log(user)

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 400))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

// export const newInstructor = async (req, res) => {
//   console.log(req.method)
//   return
// }

export const SocialReg = async (user) => {
  // console.log("cont", user)

  connectDB()

  const userExists = await User.findOne({ socialId: user.id })
  const userEmail = await User.findOne({ email: user.email })

  if (userExists || userEmail) return

  const registereduser = await User.create({
    socialId: user.id,
    name: user.name,
    email: user.email || "",
    // password: hashPassword || "",
  })
}
