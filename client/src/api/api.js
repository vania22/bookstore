import axios from "axios";

import { API } from "../constants/constants";

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  } else if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signUp = async (values, onSuccessCallBack, onErrorCallback) => {
  try {
    let response = await axios.post(`${API.ENDPOINT}/signup`, JSON.stringify(values), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    onSuccessCallBack(response);
  } catch (error) {
    onErrorCallback(error);
  }
};

export const signIn = async (values, onSuccessCallBack, onErrorCallback) => {
  try {
    let response = await axios.post(`${API.ENDPOINT}/signin`, JSON.stringify(values), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    onSuccessCallBack(response);
  } catch (error) {
    onErrorCallback(error);
  }
};

export const createCategory = async (values, onSuccessCallBack, onErrorCallback) => {
  const { token, user } = isAuthenticated();
  try {
    let response = await axios.post(
      `${API.ENDPOINT}/category/create/${user._id}`,
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );

    onSuccessCallBack(response);
  } catch (error) {
    onErrorCallback(error);
  }
};

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

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${API.ENDPOINT}/categories`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
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

// Returns user object with user name, email, id,
