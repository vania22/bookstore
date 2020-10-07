import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/constants";

import { getProductPhoto } from "../api/products";

const CardItem = ({ product }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <img src={`${API.ENDPOINT}/product/photo/${product._id}`} className="image card-img-top" />
        <div className="product-body">
          <p className="description">{product.description}</p>
          <p>$ {product.price}</p>
          <Link to="#">
            <button className="btn btn-outline-primary">View</button>
          </Link>
          <button className="btn btn-warning text-light">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
