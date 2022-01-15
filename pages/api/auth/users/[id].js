import connectDB from "../../../../utils/connectDB"
import { adminUpdateUser, deleteUser, getUserById } from "../userCont"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUserById(req, res)
      break
    case "DELETE":
      await deleteUser(req, res)
      break
    case "PUT":
      await adminUpdateUser(req, res)
      break
  }
}
