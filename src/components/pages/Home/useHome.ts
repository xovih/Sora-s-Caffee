import { useDebounce } from "use-debounce";
import menuService from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigation } from "react-router-dom";
import { removeLocalStorage } from "../../../utils/storage";
import reviewService from "../../../services/review.service";

const useHome = () => {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const navigation = useNavigation();

  const isReady = navigation.state === "idle";

  const getMenus = async () => {
    const params = `search=${searchValue}&pageSize=6&page=1`;
    const res = await menuService.list(params);
    if (res.status === 401) {
      removeLocalStorage("auth");
      const retry = await menuService.list(params);
      return retry.data.data;
    }
    return res.data.data;
  };

  const {
    data: dataMenu,
    isLoading: isLoadingMenu,
    isRefetching: isRefetchingMenu,
    refetch: refetchMenu,
  } = useQuery({
    queryKey: ["Home", searchValue],
    queryFn: getMenus,
    enabled: isReady || !!searchValue,
  });

  const getLastReviews = async () => {
    const params = `pageSize=4&page=1`;
    const res = await reviewService.list(params);
    if (res.status === 401) {
      removeLocalStorage("auth");
      const retry = await reviewService.list(params);
      return retry.data.data;
    }
    return res.data.data;
  };

  const {
    data: dataReview,
    isLoading: isLoadingReview,
    isRefetching: isRefetchingReview,
    refetch: refetchReview,
  } = useQuery({
    queryKey: ["Home"],
    queryFn: getLastReviews,
    enabled: isReady,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  return {
    dataMenu,
    isLoadingMenu,
    isRefetchingMenu,
    refetchMenu,

    dataReview,
    isLoadingReview,
    isRefetchingReview,
    refetchReview,

    handleClearSearch,
    handleSearch,
  };
};

export default useHome;
