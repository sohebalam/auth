import { createContext, useReducer, useEffect } from "react"
import reducers from "./Reducers"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    cart: [],
    modal: {},
    address: [],
    payment: String,
    order: [],
    orderPay: {},
  }
  const [state, dispatch] = useReducer(reducers, initialState)
  const { cart, address, payment } = state

  useEffect(() => {
    const cart_update = JSON.parse(localStorage.getItem("cart_update"))

    if (cart_update) dispatch({ type: "ADD_CART", payload: cart_update })

    const address_update = JSON.parse(localStorage.getItem("address_update"))

    if (address_update)
      dispatch({ type: "ADD_ADDRESS", payload: address_update })

    // const payment_update = JSON.parse(localStorage.getItem("payment_update"))

    // if (payment_update)
    //   dispatch({ type: "ADD_PAYMENT", payload: payment_update })
  }, [])

  useEffect(() => {
    localStorage.setItem("cart_update", JSON.stringify(cart))
    localStorage.setItem("address_update", JSON.stringify(address))
    // localStorage.setItem("payment_update", JSON.stringify(payment))
  }, [cart, address])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}
