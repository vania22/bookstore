import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import CardItem from "../components/CardItem";
import { CartContext } from "../helpers/CartContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const totalItems = state.reduce((acc, curr) => {
    return acc + parseInt(curr.count);
  }, 0);

  const totalPrice = state.reduce((acc, curr) => {
    return acc + parseInt(curr.count) * curr.price;
  }, 0);

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items here"
      className="container-fluid"
    >
      <div className="cart-container">
        <h2>You have {totalItems} items in the cart</h2>
        <hr />
        <div className="">
          <div className="cart-items">
            {state.map((item) => (
              <div className="product-container cart-item" key={item._id}>
                <CardItem product={item} cart state={state} dispatch={dispatch} />
              </div>
            ))}
          </div>
        </div>
        {!!totalPrice && (
          <div className="mt-5 mb-5 row">
            <h2>Total: ${totalPrice}</h2>
            <button className="btn btn-success ml-5">
              <Link to="/checkout">Checkout</Link>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
