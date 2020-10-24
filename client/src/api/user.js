import axios from "axios";
import { API } from "../constants/constants";
import { isAuthenticated } from "./auth";

const { token, user } = isAuthenticated();

export const updateUserInfo = async (name, email) => {
  try {
    const response = await axios.put(
      `${API.ENDPOINT}/user/${user._id}`,
      { name, email },
      { headers: { authorization: token } }
    );

    return response;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getUserHistory = async () => {
  try {
    const response = await axios.get(`${API.ENDPOINT}/user/history/${user._id}`, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error.message);

    return error;
  }
};
