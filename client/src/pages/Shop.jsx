import React, { useState, useEffect } from "react";

import Layout from "./Layout";
import Search from "../components/Search";
import { getProducts, getFilteredProducts } from "../api/products";
import { getCategories } from "../api/categories";
import CardItem from "../components/CardItem";
import CheckBoxes from "../components/CheckBoxes";
import PriceRange from "../components/PriceRange";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState({ categories: [], priceRange: [0, 150] });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 6;

  useEffect(() => {
    const loadInitalProducts = async () => {
      setProducts(await getProducts("sold"));
      setLoading(false);
    };
    loadInitalProducts();
    const categoriesList = async () => {
      setCategories(await getCategories());
    };

    categoriesList();
  }, []);

  const loadFilteredProducts = async () => {
    setLoading(true);
    const { data } = await getFilteredProducts(0, limit, filters, searchTerm);
    setProducts(data);
    setLoading(false);
    setSearchTerm("");
    setSkip(0);
  };

  const handleFilters = (filter, filterBy) => {
    setFilters({ ...filters, [filterBy]: filter });
  };

  const loadMore = async () => {
    let toSkip = skip + limit;

    const { data } = await getFilteredProducts(toSkip, limit, filters, searchTerm);
    setProducts([...products, ...data]);
    setSkip(toSkip);
  };

  return (
    <Layout title="Shop" description="shop the best IT books here!" className="container-fluid">
      <div className="shop-container">
        <div className="col-4 filters">
          <Search searchTerm={searchTerm} setSearchTerm={(e) => setSearchTerm(e)} />
          <h4>Filter by categories</h4>
          <ul>
            <CheckBoxes
              categories={categories}
              handleFilters={(filter) => handleFilters(filter, "categories")}
            />
          </ul>
          <h4>Price range</h4>
          <PriceRange handleFilters={(filter) => handleFilters(filter, "priceRange")} />
          <button className="btn btn-primary" onClick={() => loadFilteredProducts()}>
            Filter
          </button>
        </div>
        {loading ? null : (
          <div className="shop-products-container">
            {products.length > 0 ? (
              <>
                <h2 className="mb-4">Products</h2>
                <div className="row">
                  {products.map((product) => (
                    <div className="product-container row" key={product._id}>
                      <CardItem product={product} />
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary loadmore-button" onClick={() => loadMore()}>
                  Load More...
                </button>
              </>
            ) : (
              <h1 className="no-products-label">No Products found</h1>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
