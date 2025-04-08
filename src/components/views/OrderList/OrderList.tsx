/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Key, ReactNode, useCallback, useEffect, useMemo } from "react";
import useOrderList from "./useOrderList";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { CircleCheck, Search } from "lucide-react";
import { LIMIT_LIST, STATUS_LIST } from "../../../constants/list";
import { useNavigate } from "react-router-dom";
import COLUMN_LIST_ORDERS from "./OrderList.constant";
import DataTable from "../../ui/DataTable";
import { cn } from "../../../utils/cn";
import { removeLocalStorage } from "../../../utils/storage";

const OrderList = () => {
  const navigate = useNavigate();

  const handleCreateOrder = () => navigate("/order-add");

  const {
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
    errorOrders,
    refetchOrders,
    isLoadingOrders,
    isRefetchingOrders,

    mutateChangeStatus,
    isPendingMutateChangeStatus,
    isSuccessChangeStatus,
  } = useOrderList();

  useEffect(() => {
    if (errorOrders?.message === "Unauthorized") {
      removeLocalStorage("auth");
      navigate("/");
    }
  }, [errorOrders]);

  const numberedData = useMemo(() => {
    return (dataOrders?.data || []).map((item: any, index: number) => ({
      ...item,
      no: (currentPage - 1) * currentLimit + index + 1,
    }));
  }, [dataOrders, currentPage, currentLimit]);

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <div className="flex w-full flex-col gap-4 md:w-1/2 md:flex-row">
          <Select
            className="w-full md:w-1/2"
            disallowEmptySelection
            size="md"
            selectedKeys={[currentStatus]}
            selectionMode="single"
            onChange={handleFilterStatus}
            startContent={<p className="text-small">Status:</p>}
            aria-label="table-limit"
          >
            {STATUS_LIST.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
          <Input
            isClearable
            className="w-full md:w-1/2"
            placeholder="Search By Customer Name"
            startContent={<Search />}
            onClear={handleClearSearch}
            onChange={handleSearch}
            aria-label="table-search"
          />
        </div>
        <Button
          className="mx-2 w-full bg-yellow-950 text-white md:w-auto"
          variant="flat"
          onPress={handleCreateOrder}
        >
          Create New Order
        </Button>
      </div>
    );
  }, [handleChangeLimit, handleSearch, handleClearSearch, handleChangePage]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center py-2 lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          disallowEmptySelection
          size="md"
          selectedKeys={[String(currentLimit)]}
          selectionMode="single"
          onChange={handleChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          aria-label="table-limit"
        >
          {LIMIT_LIST.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
        {dataOrders?.paging.totalPages > 1 && (
          <Pagination
            classNames={{
              cursor: "bg-yellow-950 text-white",
            }}
            isCompact
            showControls
            page={currentPage}
            total={dataOrders?.paging.totalPages || 1}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [currentLimit, currentPage, handleChangeLimit, handleChangePage]);

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      const cellValue = item[columnKey as keyof typeof item];

      switch (columnKey) {
        case "no":
          return <span className="text-center">{item.no as number}</span>;

        case "total":
          return <span className="text-center">$ {item.total as number}</span>;

        case "status":
          return (
            <div
              className={cn(
                "flex items-center justify-center gap-2 rounded-full border border-warning bg-white px-4 py-2 capitalize text-black",
                {
                  "border-success": item.status === "COMPLETED",
                },
              )}
            >
              {item.status === "PROCESSING" ? (
                <Spinner size="sm" color="warning" />
              ) : (
                <CircleCheck className="text-3xl text-success-500" />
              )}
              {`${item.status}`}
            </div>
          );

        case "actions":
          return (
            <div className="flex flex-row space-x-2">
              <Button
                type="button"
                size="md"
                isIconOnly
                className="rounded-full border border-yellow-950 bg-yellow-950/20 text-black hover:bg-yellow-950 hover:text-white"
                onPress={() => {
                  navigate(`/order-list/${item.id}`);
                }}
              >
                <Search />
              </Button>
              {item.status === "PROCESSING" && (
                <Button
                  type="button"
                  size="md"
                  className="rounded-full bg-yellow-950 text-white"
                  onPress={() => {
                    mutateChangeStatus(item.id as string);
                  }}
                >
                  Mark Complete
                </Button>
              )}
            </div>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [currentLimit, currentPage, currentStatus, currentSearch],
  );

  useEffect(() => {
    if (isSuccessChangeStatus) {
      refetchOrders();
    }
  }, [isSuccessChangeStatus]);

  return (
    <DataTable
      columns={COLUMN_LIST_ORDERS}
      data={numberedData || []}
      emptyContent="Orders Data is empty"
      isLoading={
        isLoadingOrders || isRefetchingOrders || isPendingMutateChangeStatus
      }
      renderCell={renderCell}
      BottomContent={BottomContent}
      TopContent={TopContent}
    />
  );
};

export default OrderList;
