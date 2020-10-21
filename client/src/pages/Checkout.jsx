import React, { useContext, useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";

import Layout from "./Layout";
import { CartContext } from "../helpers/CartContext";
import { getBraintreeClientToken } from "../api/braintree";

const Cart = () => {
  const [braintreeData, setBraintreeData] = useState({ instance: {}, clientToken: null });

  const { state } = useContext(CartContext);

  const totalItems = state.reduce((acc, curr) => {
    return acc + parseInt(curr.count);
  }, 0);

  const totalPrice = state.reduce((acc, curr) => {
    return acc + parseInt(curr.count) * curr.price;
  }, 0);

  useEffect(() => {
    const braintreeToken = async () => {
      const { data } = await getBraintreeClientToken();
      setBraintreeData({ ...braintreeData, clientToken: data.clientToken });
      return data;
    };

    braintreeToken();
  }, []);

  return (
    <Layout
      title="Checkout"
      description="Come back if you need more from us!"
      className="container-fluid"
    >
      <div className="checkout-container">
        <div className="mt-5 mb-5 col braintree-container">
          {braintreeData.clientToken && (
            <>
              <DropIn
                options={{ authorization: braintreeData.clientToken }}
                onInstance={(instance) => (braintreeData.instance = instance)}
              />
            </>
          )}
          <div className="row checkout-price-button-container">
            <h2>Total: ${totalPrice}</h2>
            <button className="btn btn-success ml-5">Checkout</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
