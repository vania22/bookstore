import axios from "axios";
import { API } from "../constants/constants";
import { isAuthenticated } from "./auth";

export const createProduct = async (values, onSuccessCallBack, onErrorCallback) => {
  const { token, user } = isAuthenticated();
  const formData = new FormData();
  for (let key in values) {
    formData.append(key, values[key]);
  }

  try {
    let response = await axios.post(`${API.ENDPOINT}/product/create/${user._id}`, formData, {
      headers: {
        authorization: token,
      },
    });

    onSuccessCallBack(response);
  } catch (error) {
    onErrorCallback(error);
  }
};

export const getProducts = async (sortBy) => {
  try {
    const { data } = await axios.get(
      `${API.ENDPOINT}/products?sortBy=${sortBy}&order=desc&limit=6`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await axios.get(`${API.ENDPOINT}/product/${productId}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedProducts = async (productId) => {
  try {
    const { data } = await axios.get(`${API.ENDPOINT}/products/related/${productId}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = async (skip, limit, filters = {}, searchTerm) => {
  const body = {
    limit,
    skip,
    filters: {
      category: filters.categories,
      price: filters.priceRange,
    },
    searchTerm,
  };

  try {
    const { data } = await axios.post(`${API.ENDPOINT}/products/by/filter`, body);
    return data;
  } catch (error) {
    return error;
  }
};
