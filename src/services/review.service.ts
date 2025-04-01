import endpoint from "../constants/endpoint";
import instance from "../lib/axios/instance";
import { IReview } from "../types/review";

const reviewService = {
  list: (params?: string) => instance.get(`${endpoint.REVIEWS}?${params}`),
  post: (payload: IReview) => instance.post(`${endpoint.REVIEWS}`, payload),
};

export default reviewService;
