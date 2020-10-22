import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import Layout from "./Layout";
import { CartContext } from "../helpers/CartContext";
import { getBraintreeClientToken, processPayment } from "../api/braintree";
import { createOrder } from "../api/orders";

const Cart = () => {
  const [braintreeData, setBraintreeData] = useState({
    instance: {},
    clientToken: null,
    error: null,
    success: null,
  });

  const [address, setAddress] = useState("");

  const { state, dispatch } = useContext(CartContext);

  const totalPrice = state.reduce((acc, curr) => {
    return acc + parseInt(curr.count) * curr.price;
  }, 0);

  useEffect(() => {
    let control = true;

    const braintreeToken = async () => {
      const { data } = await getBraintreeClientToken();
      if (control) {
        setBraintreeData({ ...braintreeData, clientToken: data.clientToken });
      }
    };

    braintreeToken();

    return () => (control = false);
  }, []);

  const buy = () => {
    let nonce;
    let getNonce = braintreeData.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          price: totalPrice,
        };

        processPayment(paymentData)
          .then(({ data }) => {
            setBraintreeData({ ...braintreeData, success: data.success });

            const orderInfo = {
              products: state,
              transactionId: data.transaction.id,
              amount: data.transaction.amount,
              address,
            };

            createOrder(orderInfo);

            dispatch({ type: "empty_cart" });
            setAddress("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => setBraintreeData({ ...braintreeData, error: err.message }));
  };

  return (
    <Layout
      title="Checkout"
      description="Come back if you need more from us!"
      className="container-fluid"
    >
      {state.length < 1 && !braintreeData.success && <Redirect to="/" />}
      <div className="checkout-container">
        <div
          className="mt-5 mb-5 col braintree-container"
          onBlur={() => setBraintreeData({ ...braintreeData, error: null, success: null })}
        >
          {braintreeData.error && <div className="alert alert-danger">{braintreeData.error}</div>}
          {braintreeData.success && (
            <div className="alert alert-success">Thank you for your purchase!</div>
          )}
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Please provide your shipping address here"
          />
          {braintreeData.clientToken && (
            <DropIn
              options={{
                authorization: braintreeData.clientToken,
              }}
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
