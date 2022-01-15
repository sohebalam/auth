import jwt from "jsonwebtoken"
import User from "../models/userModel"

function Authenticated(icomponent) {
  return async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(401).json({ error: "you must logged in" })
    }
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
      req.userId = userId
      req.user = await User.findById(req.userId).select("-password")
      return icomponent(req, res)
    } catch (err) {
      console.log(err)
      return res.status(401).json({ error: "you must logged in" })
    }
  }
}

export default Authenticated
