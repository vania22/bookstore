import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/constants";
import { CartContext } from "../helpers/CartContext";
import { isAuthenticated } from "../api/auth";

const CardItem = ({ product, cart }) => {
  const { dispatch } = useContext(CartContext);
  const [itemCount, setItemCount] = useState(0);
  const { user } = isAuthenticated();

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
      } else if (itemCountValidated > product.quantity) {
        itemCountValidated = product.quantity;
        setItemCount(product.quantity);
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

        <img
          src={`${API.ENDPOINT}/product/photo/${product._id}`}
          alt={product.name}
          className="image card-img-top"
        />
        <div className="product-body">
          <p className="description">{product.description}</p>
          <p>$ {product.price}</p>
          {product.quantity === 0 && <p className=".text-danger">Out of stock</p>}
          {cart && (
            <p>
              You selected
              <input
                type="number"
                className="item-count-input"
                min="1"
                max={product.quantity}
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
        {user && user.role === 1 && (
          <Link to={`/product/update/${product._id}`}>
            <button className="btn btn-warning text-white p-1 ml-3 mt-2">Update Product</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardItem;
