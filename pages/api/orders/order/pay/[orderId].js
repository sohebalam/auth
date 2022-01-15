import { updateOrderToPaid } from "../../controller/orderCont"

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateOrderToPaid(req, res)
      //   console.log(req.query.orderId)
      break
    //   case "POST":
    //     await addOrderItems(req, res)
    //     break
    // case "DELETE":
    //   await deleteProduct(req, res)
    //   break
  }
}
