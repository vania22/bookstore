import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";
import OrdersTable from "../../components/OrdersTable";
import UserInformation from "../../components/UserInformation";
import { isAuthenticated } from "../../api/auth";

const AdminDashboard = () => {
  const {
    user: { name },
  } = isAuthenticated();

  return (
    <Layout title="Dashboard" description={`Hi there, ${name}!`} className="container">
      <div className="md-row sm-col">
        <div className="sm-col-12 md-col-3 mb-5">
          <div className="card">
            <h3 className="card-header">Admin Links</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/create/category">Create Category</Link>
              </li>
              <li className="list-group-item">
                <Link to="/create/product">Create Product</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <UserInformation />
        </div>
      </div>
      <OrdersTable />
    </Layout>
  );
};

export default AdminDashboard;
