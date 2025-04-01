import endpoint from "../constants/endpoint";
import instance from "../lib/axios/instance";

const menuService = {
  list: (params?: string) => instance.get(`${endpoint.MENU}?${params}`),
  detail: (id: string) => instance.get(`${endpoint.MENU}/${id}`),
};

export default menuService;
