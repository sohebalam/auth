import Authenticated from "../../../../utils/Authenticated"
import Order from "../../../../models/orderModel"
import User from "../../../../models/userModel"

export const addOrderItems = Authenticated(async (req, res) => {
  const { cart: orderItems, payment, subtotal, address, tax, total } = req.body

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error("No order items")
    } else {
      const order = new Order({
        orderItems,
        user: req.userId,
        address,
        paymentMethod: payment.data,
        subtotal,
        tax,
        total,
      })

      const createdOrder = await order.save()

      res.status(201).json({ order: createdOrder, success: true })
    }
  } catch (error) {
    res.status(500).json({ error: error })
    console.log(error)
  }
})

export const getOrderById = Authenticated(async (req, res) => {
  // console.log(req.query.orderId, req.userId)

  const order = await Order.findById(req.query.orderId).populate(
    "user",
    "firstName lastName email",
    User
  )

  // populate(
  //   "user",
  //   "firstName lastName email"
  // )
  try {
    if (order) {
      res.json(order)
    }
  } catch (error) {
    res.status(404)
    throw new Error("Order not found")
  }
})

export const updateOrderToPaid = Authenticated(async (req, res) => {
  const { id, status, update_time, email_address } = req.body.paymentResult
  const order = await Order.findById(req.query.orderId)

  try {
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: id,
        status: status,
        update_time: update_time,
        email_address: email_address,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }
  } catch (error) {
    res.status(404)
    throw new Error("Order not found")
  }
})

export const getMyOrders = Authenticated(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ messsage: "Server Error" })
  }
})
export const getOrders = async (req, res) => {
  // console.log(req.method)
  try {
    const orders = await Order.find().populate(
      "user",
      "id firstName lastName",
      User
    )

    // console.log(orders)
    res.json({ orders })
  } catch (error) {
    res.status(500).json({ messsage: "Server Error" })
  }
}
