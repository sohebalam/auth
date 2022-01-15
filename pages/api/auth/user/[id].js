import connectDB from "../../../../utils/connectDB"
import { updateUserProfile, getUserProfile } from "../userCont"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUserProfile(req, res)
      break
    // case "DELETE":
    //   await deleteUser(req, res)
    //   break
    case "PUT":
      await updateUserProfile(req, res)
      break
  }
}
