import axios from "axios";
import { API } from "../constants/constants";

import { isAuthenticated } from "./auth";

export const getBraintreeClientToken = async () => {
  const { token, user } = isAuthenticated();

  try {
    let response = await axios.get(`${API.ENDPOINT}/braintree/getToken/${user._id}`, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
