import axios from "axios";
import { API } from "../constants/constants";
import { isAuthenticated } from "./auth";

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

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${API.ENDPOINT}/categories`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
