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

export const listOrders = async (skip) => {
  const { token, user } = isAuthenticated();

  try {
    const data = axios.get(`${API.ENDPOINT}/orders/${user._id}?skip=${skip}`, {
      headers: {
        authorization: token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  const { token, user } = isAuthenticated();

  try {
    const data = await axios.put(
      `${API.ENDPOINT}/order/${user._id}`,
      {
        orderId,
        status,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
