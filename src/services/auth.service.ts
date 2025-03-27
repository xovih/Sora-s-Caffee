import { environemnt } from "../components/constants/environment";
import { ILogin } from "../types/auth";
import { fetchAPI } from "../utils/fetch";

export const loginService = async (payload: ILogin) => {
  console.log(payload);
  const response = await fetchAPI(`${environemnt.API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response;
};
