import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";
import { isAuthenticated } from "../../api/auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role, history },
  } = isAuthenticated();

  return (
    <Layout title="Dashboard" description={`Hi there, ${name}!`} className="container">
      <div className="row">
        <div className="col-3">
          <div className="card">
            <h3 className="card-header">Admin Links</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/create/category">Create Category</Link>
              </li>
              <li className="list-group-item">
                <Link to="/create/product">Create Product</Link>
              </li>
              <li className="list-group-item">
                <Link to="/profile/udpate">Update Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">Name: {name}</li>
              <li className="list-group-item">Email: {email}</li>
              <li className="list-group-item">Role: Administrator</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
