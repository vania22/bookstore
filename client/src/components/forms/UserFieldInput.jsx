import React from "react";

const UserFieldInput = ({ value, onChange, label }) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{label}</label>
      <input
        className="form-control"
        type="text"
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default UserFieldInput;
