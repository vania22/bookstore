import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ prooduct }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{prooduct.name}</div>
        <div className="product-body">
          <p>{prooduct.description}</p>
          <p>$ {prooduct.price}</p>
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
