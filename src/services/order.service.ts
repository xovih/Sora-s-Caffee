import endpoint from "../constants/endpoint";
import instance from "../lib/axios/instance";
import { IOrder } from "../types/orders";

const orderService = {
  list: (params?: string) => instance.get(`${endpoint.ORDERS}?${params}`),
  detail: (id: string) => instance.get(`${endpoint.ORDERS}/${id}`),
  create: (payload: IOrder) => instance.post(`${endpoint.ORDERS}`, payload),
  changeStatus: (id: string) =>
    instance.put(`${endpoint.ORDERS}/${id}`, { status: "COMPLETED" }),
  delete: (id: string) => instance.delete(`${endpoint.ORDERS}/${id}`),
};

export default orderService;
