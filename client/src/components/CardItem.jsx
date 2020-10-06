import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/constants";

import { getProductPhoto } from "../api/products";

const CardItem = ({ product }) => {
  return (
    <div className="col-4 mb-3r">
      <div className="card mb-3 ml-auto mr-auto" style={{ width: "281px" }}>
        <div className="card-header">{product.name}</div>
        <img
          src={`${API.ENDPOINT}/product/photo/${product._id}`}
          className="card-img-top rounded mb-3"
          style={{ height: "365px", width: "280px", margin: "20px auto" }}
        />
        <div className="product-body">
          <p>{product.description}</p>
          <p>$ {product.price}</p>
          <Link to="#">
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View</button>
          </Link>
          <button className="btn btn-warning mt-2 mb-2 text-light">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
