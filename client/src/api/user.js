import axios from "axios";
import { API } from "../constants/constants";
import { isAuthenticated } from "./auth";

export const updateUserInfo = async (name, email) => {
  const { token, user } = isAuthenticated();

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
