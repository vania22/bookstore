import React, { useContext, useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";

import Layout from "./Layout";
import { CartContext } from "../helpers/CartContext";
import { getBraintreeClientToken } from "../api/braintree";

const Cart = () => {
  const [braintreeData, setBraintreeData] = useState({
    instance: {},
    clientToken: null,
    error: null,
  });

  const { state } = useContext(CartContext);

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

  const buy = () => {
    let nonce;
    let getNonce = braintreeData.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;

        console.log(nonce, totalPrice);
      })
      .catch((err) => setBraintreeData({ ...braintreeData, error: err.message }));
  };

  return (
    <Layout
      title="Checkout"
      description="Come back if you need more from us!"
      className="container-fluid"
    >
      <div className="checkout-container">
        <div
          className="mt-5 mb-5 col braintree-container"
          onBlur={() => setBraintreeData({ ...braintreeData, error: null })}
        >
          {braintreeData.error && <div className="alert alert-danger">{braintreeData.error}</div>}
          {braintreeData.clientToken && (
            <DropIn
              options={{ authorization: braintreeData.clientToken }}
              onInstance={(instance) => (braintreeData.instance = instance)}
            />
          )}
          <div className="row checkout-price-button-container">
            <h2>Total: ${totalPrice}</h2>
            <button className="btn btn-success ml-5" onClick={buy}>
              Buy!
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
