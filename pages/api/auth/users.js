import connectDB from "../../../utils/connectDB"
import { deleteUser, getUsers } from "./userCont"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUsers(req, res)
      break
    // case "POST":
    //   await addOrderItems(req, res)
    //   break
    case "DELETE":
      await deleteUser(req, res)
      break
  }
}
