import React, { useState, useEffect } from "react";

import { getProducts } from "../api/products";
import Layout from "./Layout";
import CardItem from "../components/CardItem";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);

  const loadProductsBySell = async () => {
    setProductsBySell(await getProducts("sold"));
  };

  const loadProductsByArrival = async () => {
    setProductsByArrival(await getProducts("createdAt"));
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Best IT books here!"
      className="home-content container-fluid row"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row product-container">
        {productsByArrival.map((product) => (
          <CardItem key={product._id} product={product} />
        ))}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row product-container">
        {productsBySell.map((product) => (
          <CardItem key={product._id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
