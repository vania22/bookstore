import React, { useReducer } from "react";

export const CartContext = React.createContext([]);

const addItemToCart = (item, state) => {
  let cart = [...state];

  const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  if (existingItem) {
    cart = cart.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
    );
  } else {
    cart = [...cart, { ...item, count: 1 }];
  }

  return cart;
};

const CartReducerContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  function reducer(state, action) {
    switch (action.type) {
      case "add_item":
        return addItemToCart(action.payload, state);
      default:
        throw new Error();
    }
  }

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export default CartReducerContext;
