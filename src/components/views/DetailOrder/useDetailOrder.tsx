/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation, useParams } from "react-router-dom";
import orderService from "../../../services/order.service";
import { useQuery } from "@tanstack/react-query";

const useDetailOrder = () => {
  const navigation = useNavigation();
  const isReady = navigation.state === "idle";

  const { id } = useParams();

  const getDetailOrder = async (id: string) => {
    try {
      const { data } = await orderService.detail(id);
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized");
      }
      throw error;
    }
  };

  const {
    data: dataOrderDetail,
    isLoading: isLoadingDetailOrder,
    error: errorDetailOrder,
  } = useQuery({
    queryKey: ["DetailOrder", id],
    queryFn: () => getDetailOrder(id || ""),
    enabled: !!id && isReady,
  });

  return {
    dataOrderDetail,
    isLoadingDetailOrder,
    errorDetailOrder,
  };
};

export default useDetailOrder;
