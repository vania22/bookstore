import React, { useReducer } from "react";
import { addItemToCart, removeItemFromCart, changeCount, emptyCart } from "./reducerHelpers";

export const CartContext = React.createContext([]);

const CartReducerContext = ({ children }) => {
  const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "add_item":
        return addItemToCart(action.payload, state);
      case "remove_item":
        return removeItemFromCart(action.payload, state);
      case "change_count":
        return changeCount(action.payload, state);
      case "empty_cart":
        return emptyCart();
      default:
        throw new Error();
    }
  }

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export default CartReducerContext;
