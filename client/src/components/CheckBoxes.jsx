import React, { useState, useEffect } from "react";

const CheckBoxes = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => () => {
    let categories = [...checked];

    if (checked.indexOf(id) === -1) {
      categories.push(id);
    } else {
      categories = categories.filter((categoryId) => categoryId !== id);
    }

    setChecked(categories);
    handleFilters(categories);
  };

  return categories.map((category) => (
    <li className="list-unstyled" key={category._id}>
      <input type="checkbox" className="form-check-input" onChange={handleToggle(category._id)} />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default CheckBoxes;
