import React, { useReducer } from "react";

export const CartContext = React.createContext([]);

const addItemToCart = (item, state) => {
  let cart = [...state];

  const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  if (existingItem) {
    cart = cart.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, count: parseInt(cartItem.count) + 1 } : cartItem
    );
  } else {
    cart = [...cart, { ...item, count: 1 }];
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

const removeItemFromCart = (item, state) => {
  let cart = [...state];

  let filteredCart = cart.filter((cartItem) => cartItem._id !== item._id);

  localStorage.setItem("cart", JSON.stringify(filteredCart));

  return filteredCart;
};

const changeCount = (item, state) => {
  const { product, itemCount } = item;
  let cart = [...state];

  let filteredCart = cart.map((cartItem) =>
    cartItem._id === product._id ? { ...cartItem, count: itemCount } : cartItem
  );

  localStorage.setItem("cart", JSON.stringify(filteredCart));

  return filteredCart;
};

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
      default:
        throw new Error();
    }
  }

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export default CartReducerContext;
