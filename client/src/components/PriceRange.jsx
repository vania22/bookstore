import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

import "rc-slider/assets/index.css";

const PriceRange = ({ handleFilters }) => {
  const [value, setValue] = useState([0, 30]);

  const handleChange = (values) => {
    setValue(values);
    handleFilters(values);
  };

  return (
    <>
      <Range
        min={0}
        max={150}
        defaultValue={[0, 30]}
        value={value}
        allowCross={true}
        onChange={(values) => handleChange(values)}
        style={{ width: "80%" }}
      />
      <h6 style={{ width: "80%", textAlign: "center" }}>{`$${value[0]} - $${value[1]}`}</h6>
    </>
  );
};

export default PriceRange;
