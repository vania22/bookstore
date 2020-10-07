import React, { useState, useEffect } from "react";

import Layout from "./Layout";
import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";
import CardItem from "../components/CardItem";
import CheckBoxes from "../components/CheckBoxes";
import PriceRange from "../components/PriceRange";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categories: [], priceRange: [0, 30] });

  useEffect(() => {
    const categoriesList = async () => {
      setCategories(await getCategories());
    };

    categoriesList();
  }, []);

  const handleFilters = (filter, filterBy) => {
    setFilters({ ...filters, [filterBy]: filter });
  };

  return (
    <Layout title="Shop" description="shop the best IT books here!" className="container-fluid">
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <CheckBoxes
              categories={categories}
              handleFilters={(filter) => handleFilters(filter, "categories")}
            />
          </ul>
          <h4>Price range</h4>
          <PriceRange handleFilters={(filter) => handleFilters(filter, "priceRange")} />
        </div>
        <div className="col-8">{JSON.stringify(filters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
