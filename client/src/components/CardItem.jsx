import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/constants";
import { CartContext } from "../helpers/CartContext";

const CardItem = ({ product, cart }) => {
  const { dispatch, state } = useContext(CartContext);
  const [itemCount, setItemCount] = useState(0);

  // Set itemCount to the count of the item in the cart (and use this number in the input value)
  useEffect(() => {
    if (cart) {
      setItemCount(product.count);
    }
  }, []);

  // On itemCount change method which updates the state with new itemCount value
  useEffect(() => {
    let itemCountValidated = itemCount;
    if (cart) {
      if (itemCountValidated < 1 || itemCountValidated === NaN) {
        itemCountValidated = 1;
      } else if (itemCountValidated > 10) {
        itemCountValidated = 10;
      }

      dispatch({ type: "change_count", payload: { product, itemCount: itemCountValidated } });
    }
  }, [itemCount]);

  // Add to cart on click
  const addToCart = () => {
    dispatch({ type: "add_item", payload: product });
  };

  // Remove from cart on click
  const removeFromCart = () => {
    dispatch({ type: "remove_item", payload: product });
  };

  // input controller
  const onCountChange = (e) => {
    setItemCount(e.target.value);
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">{product.name}</div>
        {cart && (
          <div className="remove-button" onClick={removeFromCart}>
            x
          </div>
        )}

        <img src={`${API.ENDPOINT}/product/photo/${product._id}`} className="image card-img-top" />
        <div className="product-body">
          <p className="description">{product.description}</p>
          <p>$ {product.price}</p>
          {cart && (
            <p>
              You selected
              <input
                type="number"
                className="item-count-input"
                min="1"
                max="10"
                value={itemCount}
                onChange={(e) => onCountChange(e)}
              />
              book(s)
            </p>
          )}
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary">View</button>
          </Link>
          {!cart && (
            <button className="btn btn-warning text-light" onClick={addToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
