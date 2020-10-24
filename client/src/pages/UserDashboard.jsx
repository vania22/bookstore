import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import UserFieldInput from "../components/forms/UserFieldInput";
import { isAuthenticated } from "../api/auth";

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [inputsToggle, setInputsToggle] = useState(false);

  const {
    user: { _id, name, email, role, history },
  } = isAuthenticated();

  useEffect(() => {
    setUsername(name);
    setUseremail(email);
  }, [inputsToggle]);

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
              <li className="list-group-item">
                <Link to="/profile/udpate">Update Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9">
          <div className="card mb-5 userinfo-block">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
              <li className="list-group-item">
                {inputsToggle ? (
                  <UserFieldInput value={username} onChange={(e) => setUsername(e)} label="Name" />
                ) : (
                  `Name: ${name}`
                )}
              </li>
              <li className="list-group-item">
                {inputsToggle ? (
                  <UserFieldInput
                    value={useremail}
                    onChange={(e) => setUseremail(e)}
                    label="Email"
                  />
                ) : (
                  `Email: ${email}`
                )}
              </li>
              <li className="list-group-item">Role: Registered User</li>
            </ul>
            <div className="buttons-container">
              {inputsToggle ? (
                <button className="btn btn-danger" onClick={() => setInputsToggle(!inputsToggle)}>
                  Cancel
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => setInputsToggle(!inputsToggle)}>
                  Edit
                </button>
              )}

              {inputsToggle && (
                <button className="btn btn-success" onClick={() => setInputsToggle(!inputsToggle)}>
                  Save
                </button>
              )}
            </div>
          </div>
          <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            <ul className="list-group">
              <li className="list-group-item">Item</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
