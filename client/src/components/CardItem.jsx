import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/constants";
import { CartContext } from "../helpers/CartContext";

const CardItem = ({ product }) => {
  const { dispatch, state } = useContext(CartContext);

  const addToCart = () => {
    dispatch({ type: "add_item", payload: product });
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <img src={`${API.ENDPOINT}/product/photo/${product._id}`} className="image card-img-top" />
        <div className="product-body">
          <p className="description">{product.description}</p>
          <p>$ {product.price}</p>
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary">View</button>
          </Link>
          <button className="btn btn-warning text-light" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
