import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigation } from "react-router-dom";
import menuService from "../../../../../services/menu.service";

const useProductList = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);

  const [category, setCategory] = useState("");

  const isReady = navigation.state === "idle";

  const getMenus = async () => {
    const params = `search=${searchValue}&pageSize=6&page=1`;
    const res = await menuService.list(params);
    return res.data.data;
  };

  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    isRefetching: isRefetchingProduct,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["Home", searchValue, category],
    queryFn: getMenus,
    enabled: isReady || !!searchValue,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleChangeCategory = (val: string) => {
    setSearch("");
    setCategory(val);
  };

  return {
    dataProduct,
    isLoadingProduct,
    isRefetchingProduct,
    refetchProduct,

    handleClearSearch,
    handleSearch,
    handleChangeCategory,
  };
};

export default useProductList;
