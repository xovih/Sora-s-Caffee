import { useDebounce } from "use-debounce";
import menuService from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigation } from "react-router-dom";

const useHome = () => {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const navigation = useNavigation();

  const isReady = navigation.state === "idle";

  const getMenus = async () => {
    const params = `search=${searchValue}&pageSize=6&page=1`;
    const res = await menuService.list(params);
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

    handleClearSearch,
    handleSearch,
  };
};

export default useHome;
