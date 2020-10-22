import axios from "axios";
import { API } from "../constants/constants";
import { isAuthenticated } from "./auth";

export const createOrder = async (orderInfo) => {
  const { token, user } = isAuthenticated();

  try {
    const { data } = axios.post(
      `${API.ENDPOINT}/order/create/${user._id}`,
      { order: orderInfo },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};
