import axios from "axios";
import { API } from "../constants/constants";

// Returns user object with user name, email, id,
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
