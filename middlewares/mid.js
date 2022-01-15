import NextCors from "nextjs-cors"
import catchAsyncErrors from "./catchAsyncErrors"

export const CorsNext = catchAsyncErrors(async (req, res, next) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  // console.log(req.body)
  next()
})
