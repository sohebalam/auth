import nc from "next-connect"
import connectDB from "../../../connectDB"

import { currentUserProfile } from "../../../controllers/authCont"
import { isAuthenticated } from "../../../middlewares/auth"

// import onError from "../../../utils/errorHandler"

const router = nc()

connectDB()

router.use(isAuthenticated).get(currentUserProfile)

export default router
