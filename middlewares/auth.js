import catchAsyncErrors from "./catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import { getSession } from "next-auth/react"
import User from "../models/userModel"
// import Course from "../models/courseModel"

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req })
  // console.log("mid", session.user.email)

  if (!session) {
    return next(new ErrorHandler("Login first to access this resource", 401))
  }

  const user = await User.findOne({ email: session.user.email }).exec()

  // console.log("dbuser", user._id)

  req.user = user

  // console.log("requser", req.user._id)

  next()
})

export const isInstructor = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).exec()

  isUserInstructor(user)

  next()
})

const isUserInstructor = (user) => {
  if (!user.role.includes("instructor")) {
    console.log("not instructor")
    return res.status(403)
  } else {
    console.log("yes")
  }
}

export const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec()
    const course = await Course.findOne({ slug: req.query.slug }).exec()

    // console.log(course)

    // check if course id is found in user courses array
    let ids = []
    for (let i = 0; i < user.courses.length; i++) {
      ids.push(user.courses[i].toString())
    }

    if (!ids.includes(course._id.toString())) {
      res.status(403)
    } else {
      console.log("has access to course")
      next()
    }
  } catch (err) {
    console.log(err)
  }
}
