export const addItemToCart = (item, state) => {
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

export const removeItemFromCart = (item, state) => {
  let cart = [...state];

  let filteredCart = cart.filter((cartItem) => cartItem._id !== item._id);

  localStorage.setItem("cart", JSON.stringify(filteredCart));

  return filteredCart;
};

export const changeCount = (item, state) => {
  const { product, itemCount } = item;
  let cart = [...state];

  let filteredCart = cart.map((cartItem) =>
    cartItem._id === product._id ? { ...cartItem, count: itemCount } : cartItem
  );

  localStorage.setItem("cart", JSON.stringify(filteredCart));

  return filteredCart;
};
