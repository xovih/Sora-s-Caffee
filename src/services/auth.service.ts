import endpoint from "../constants/endpoint";
import instance from "../lib/axios/instance";
import { ILogin } from "../types/auth";

const authService = {
  login: (payload: ILogin) => instance.post(endpoint.AUTH, payload),
};

export default authService;
