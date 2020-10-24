import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CreateProductForm from "../../components/forms/CreateProductForm";
import Layout from "../Layout";
import { getProduct } from "../../api/products";

const AddProduct = () => {
  const [productValues, setProductValues] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const setProductValuesState = async () => {
      const response = await getProduct(id);
      const { name, description, price, quantity, shipping, category } = response;

      setProductValues({
        name,
        description,
        price,
        quantity,
        shipping,
        category,
        photo: "",
      });
    };

    setProductValuesState();
  }, []);

  return (
    <Layout
      title="Update Product"
      description="Update product on this page"
      className="container col-md-4 offset-md-4"
    >
      <CreateProductForm isUpdate initValues={productValues && productValues} />
      <div className="mt-4">
        <Link to="/admin/dashboard">Go back to dashboard</Link>
      </div>
    </Layout>
  );
};

export default AddProduct;
