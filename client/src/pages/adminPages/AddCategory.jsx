import React from "react";
import { Link } from "react-router-dom";

import CreateCategoryForm from "../../components/forms/CreateCategoryForm";
import Layout from "../Layout";

const AddCategory = () => {
  return (
    <Layout
      title="Add Category"
      description="Create new categories on this page"
      className="container col-md-4 offset-md-4"
    >
      <CreateCategoryForm />
      <div className="mt-4">
        <Link to="/admin/dashboard">Go back to dashboard</Link>
      </div>
    </Layout>
  );
};

export default AddCategory;
