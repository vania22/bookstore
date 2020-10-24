import React from "react";

const Input = ({ value, onChange, label, type }) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{label}</label>
      <input
        className="form-control"
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
