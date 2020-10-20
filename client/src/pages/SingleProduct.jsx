import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "./Layout";
import { getProduct, getRelatedProducts } from "../api/products";

const SingleProduct = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(await getProduct(productId));
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setRelatedProduct(await getRelatedProducts(productId));
    };

    fetchRelatedProducts();
  }, []);

  return (
    <Layout>
      {console.log(relatedProducts)}
      {console.log(product)}
    </Layout>
  );
};

export default SingleProduct;
