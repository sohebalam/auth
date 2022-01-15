import ACTIONS from "./Actions"

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return { ...state, notify: action.payload }
    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      }
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      }
    case ACTIONS.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }
    case ACTIONS.ADD_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      }
    case ACTIONS.ADD_ORDER:
      return {
        ...state,
        order: action.payload,
      }
    case ACTIONS.ORDER_PAY:
      return {
        ...state,
        pay: action.payload,
      }

    default:
      return state
  }
}

export default reducers
