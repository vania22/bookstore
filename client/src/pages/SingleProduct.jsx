import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import Layout from "./Layout";
import CardItem from "../components/CardItem";
import { API } from "../constants/constants";
import { getProduct, getRelatedProducts } from "../api/products";
import { CartContext } from "../helpers/CartContext";

const SingleProduct = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(await getProduct(productId));
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setRelatedProduct(await getRelatedProducts(productId));
    };

    fetchRelatedProducts();
  }, [productId]);

  const addToCart = () => {
    dispatch({ type: "add_item", payload: product });
  };

  return (
    <Layout
      title={product.name}
      description={product.description && product.description.substring(0, 100)}
      className="container-fluid"
    >
      <div className="card mb-3 single-card">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={`${API.ENDPOINT}/product/photo/${product._id}`}
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p>Added: {moment(product.createdAt).fromNow()}</p>
              <p>
                Shipping:
                {product.shipping ? " Yes" : " No"}
              </p>
              <p className="price">Price: ${product.price}</p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-warning text-light" onClick={addToCart}>
            Add to cart
          </button>
          {product.quantity > 0 ? (
            <p className="text-primary mb-0">In Stock</p>
          ) : (
            <p className="text-danger mb-0">Out of Stock</p>
          )}
        </div>
      </div>
      <div className="home-content container-fluid" style={{ flexDirection: "column" }}>
        <h2 className="mb-4">Related Products</h2>
        <div className="row product-container">
          {relatedProducts.length > 1 ? (
            relatedProducts.map((relatedProduct) =>
              product.name !== relatedProduct.name ? (
                <CardItem key={relatedProduct._id} product={relatedProduct} />
              ) : null
            )
          ) : (
            <h6 className="mb-4">No related products found</h6>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
