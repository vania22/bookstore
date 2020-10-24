import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import { isAuthenticated } from "../api/auth";
import { getUserHistory } from "../api/user";
import UserInformation from "../components/UserInformation";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await getUserHistory();
      setHistory(response.data.history);
    };

    getHistory();
  }, []);

  const {
    user: { name },
  } = isAuthenticated();

  return (
    <Layout title="Dashboard" description={`Hi there, ${name}!`} className="container">
      <div className="row">
        <div className="col-3">
          <div className="card">
            <h3 className="card-header">User Links</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/cart">My Cart</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <UserInformation />
          <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            <ul className="list-group">
              {history.length > 0 ? (
                history.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <p>Product: {item.name}</p>
                    <p>quantity: {item.count}</p>
                    <p>amount paid: {item.price}</p>
                  </li>
                ))
              ) : (
                <li>You haven't bought anything yet</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
