import { useNavigation } from "react-router-dom";
import useOrderStore from "../../../stores/OrderStore";
import { useDebouncedCallback } from "use-debounce";
import { SEACRH_DELAY } from "../../../../constants/list";
import orderService from "../../../../services/order.service";
import { ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";

const useOrderList = () => {
  const navigation = useNavigation();
  const isReady = navigation.state === "idle";

  const {
    currentLimit,
    currentPage,
    currentSearch,
    currentStatus,
    setPage,
    setSearch,
  } = useOrderStore((state) => ({
    currentLimit: state.currentLimit,
    currentPage: state.currentPage,
    currentSearch: state.currentSearch,
    currentStatus: state.currentStatus,
    setPage: state.setPage,
    setSearch: state.setSearch,
  }));

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, SEACRH_DELAY);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    debouncedSearch(e.target.value);

  const handleClearSearch = () => debouncedSearch("");

  const getOrderList = async () => {
    const params = `pageSize=${currentLimit}&page=${currentPage}&status=${currentStatus}&searc=${currentSearch}`;
    const res = await orderService.list(params);

    return {
      data: res.data.data,
      paging: res.data.metadata,
    };
  };

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: [
      "orders",
      currentPage,
      currentLimit,
      currentStatus,
      currentSearch,
    ],
    queryFn: getOrderList,
    enabled: isReady || !!currentPage || !!currentLimit || !!currentStatus,
  });

  return {
    handleClearSearch,
    handleSearch,

    dataOrders,
    isLoadingOrders,
    isRefetchingOrders,
    refetchOrders,
  };
};

export default useOrderList;
