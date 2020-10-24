import React, { useEffect, useState } from "react";

import UserFieldInput from "../components/forms/UserFieldInput";
import { isAuthenticated } from "../api/auth";
import { updateUserInfo } from "../api/user";

const UserInformation = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [inputsToggle, setInputsToggle] = useState(false);
  const [error, setError] = useState(false);

  const {
    token,
    user: { name, email, role },
  } = isAuthenticated();

  useEffect(() => {
    setUsername(name);
    setUseremail(email);
  }, [inputsToggle]);

  const onUserSave = async () => {
    try {
      const { data } = await updateUserInfo(username, useremail);
      localStorage.setItem("jwt", JSON.stringify({ token, user: data.user }));
      setInputsToggle(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="card mb-5 userinfo-block">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {inputsToggle ? (
            <UserFieldInput
              value={username}
              onChange={(e) => setUsername(e)}
              label="Name"
              type="text"
            />
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
              type="email"
            />
          ) : (
            `Email: ${email}`
          )}
        </li>
        <li className="list-group-item">
          Role: {role === 0 ? "Registered User" : "Administrator"}
        </li>
      </ul>
      {error && <div className="alert alert-danger">This email is taken</div>}
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
          <button className="btn btn-success" onClick={onUserSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
