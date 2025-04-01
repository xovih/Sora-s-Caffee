import axios from "axios";
import { environemnt } from "../../constants/environment";
import { getLocalStorage } from "../../utils/storage";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environemnt.API_URL,
  headers,
  timeout: 60 * 1000 * 2,
});

instance.interceptors.request.use(
  async (request) => {
    const auth = getLocalStorage("auth");
    if (auth && auth !== "{}") {
      request.headers.Authorization = `Bearer ${auth}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
