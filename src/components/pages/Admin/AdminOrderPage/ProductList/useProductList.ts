import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent } from "react";
import { useNavigation } from "react-router-dom";
import menuService from "../../../../../services/menu.service";
import useFilterStore from "../../../../stores/FilterStore";

const useProductList = () => {
  const navigation = useNavigation();

  const catSelected = useFilterStore((state) => state.catSelected);
  const setCatSelected = useFilterStore((state) => state.setCatSelected);
  const currentPage = useFilterStore((state) => state.currentPage);
  const setPage = useFilterStore((state) => state.setPage);
  const search = useFilterStore((state) => state.currentSearch);
  const setSearch = useFilterStore((state) => state.setSearch);
  const debouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 500);

  const isReady = navigation.state === "idle";

  const getMenus = async () => {
    const params = `pageSize=6&page=${currentPage}&category=${catSelected}&search=${search}`;
    const res = await menuService.list(params);
    return {
      data: res.data.data,
      paging: res.data.metadata,
    };
  };

  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    isRefetching: isRefetchingProduct,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["category", search, catSelected, currentPage],
    queryFn: getMenus,
    enabled: isReady || !!search || !!catSelected || !!currentPage,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    debouncedSearch("");
  };

  const handleChangePage = (p: number) => {
    setPage(p);
  };

  const handleChangeCategory = (cat: string) => {
    setCatSelected(cat);
  };

  return {
    dataProduct,
    isLoadingProduct,
    isRefetchingProduct,
    refetchProduct,

    handleClearSearch,
    handleSearch,

    catSelected,
    handleChangeCategory,

    currentPage,
    handleChangePage,
  };
};

export default useProductList;
