import React from "react";
import { Link } from "react-router-dom";

import CreateProductForm from "../../components/forms/CreateProductForm";
import Layout from "../Layout";

const AddProduct = () => {
  return (
    <Layout
      title="Add Product"
      description="Create new products on this page"
      className="container col-md-4 offset-md-4"
    >
      <CreateProductForm />
      <div className="mt-4">
        <Link to="/admin/dashboard">Go back to dashboard</Link>
      </div>
    </Layout>
  );
};

export default AddProduct;
