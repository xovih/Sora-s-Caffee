import { useNavigation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import useOrderStore from "../../stores/OrderStore";
import { SEACRH_DELAY } from "../../../constants/list";
import orderService from "../../../services/order.service";

const useOrderList = () => {
  const navigation = useNavigation();
  const isReady = navigation.state === "idle";

  const currentLimit = useOrderStore((state) => state.currentLimit);
  const setLimit = useOrderStore((state) => state.setLimit);

  const currentPage = useOrderStore((state) => state.currentPage);
  const setPage = useOrderStore((state) => state.setPage);

  const currentSearch = useOrderStore((state) => state.currentSearch);
  const setSearch = useOrderStore((state) => state.setSearch);

  const currentStatus = useOrderStore((state) => state.currentStatus);
  const setStatus = useOrderStore((state) => state.setStatus);

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleChangePage = (p: number) => setPage(p);

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, SEACRH_DELAY);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    debouncedSearch(e.target.value);

  const handleClearSearch = () => debouncedSearch("");

  const handleFilterStatus = (e: ChangeEvent<HTMLSelectElement>) =>
    setStatus(e.target.value);

  const getOrderList = async () => {
    const params = `pageSize=${currentLimit}&page=${currentPage}&status=${currentStatus}&search=${currentSearch}`;
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
    currentLimit,
    handleChangeLimit,

    currentPage,
    handleChangePage,

    currentStatus,
    handleFilterStatus,

    currentSearch,
    handleClearSearch,
    handleSearch,

    dataOrders,
    isLoadingOrders,
    isRefetchingOrders,
    refetchOrders,
  };
};

export default useOrderList;
