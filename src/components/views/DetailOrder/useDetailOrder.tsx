import { useNavigation, useParams } from "react-router-dom";
import orderService from "../../../services/order.service";
import { useQuery } from "@tanstack/react-query";

const useDetailOrder = () => {
  const navigation = useNavigation();
  const isReady = navigation.state === "idle";

  const { id } = useParams();

  const getDetailOrder = async (id: string) => {
    const { data } = await orderService.detail(id);
    return data;
  };

  const { data: dataOrderDetail, isLoading: isLoadingDetailOrder } = useQuery({
    queryKey: ["DetailOrder", id],
    queryFn: () => getDetailOrder(id || ""),
    enabled: !!id && isReady,
  });

  return {
    dataOrderDetail,
    isLoadingDetailOrder,
  };
};

export default useDetailOrder;
