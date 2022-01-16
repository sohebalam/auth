import nc from "next-connect"
import connectDB from "../../../connectDB"

import {
  currentUserProfile,
  updateProfile,
} from "../../../controllers/authCont"
import { isAuthenticated } from "../../../middlewares/auth"

// import onError from "../../../utils/errorHandler"

const router = nc()

connectDB()

router.put(updateProfile)
router.use(isAuthenticated).get(currentUserProfile)

export default router
