/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spinner } from "@heroui/react";
import useDetailOrder from "./useDetailOrder";
import { ICart } from "../../../types/orders";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { removeLocalStorage } from "../../../utils/storage";

const DetailOrder = () => {
  const {
    dataOrderDetail: order,
    isLoadingDetailOrder,
    errorDetailOrder,
  } = useDetailOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorDetailOrder?.message === "Unauthorized") {
      removeLocalStorage("auth");
      navigate("/");
    }
  }, [errorDetailOrder]);

  if (isLoadingDetailOrder)
    return (
      <div className="flex items-center justify-center gap-2">
        <Spinner color="warning" size="lg" /> <p>Loading...</p>
      </div>
    );

  return (
    <div className="flex w-full flex-col md:gap-6">
      <div className="order-3 my-6 flex items-center justify-between md:order-1 md:my-0">
        <h1 className="hidden md:block">&nbsp;</h1>
        <Button
          onPress={() => navigate("/order-list")}
          type="button"
          className="w-full bg-yellow-950 p-4 text-white hover:bg-yellow-800 md:w-auto"
        >
          Back to Orders List
        </Button>
      </div>

      {/* Info */}
      <div className="order-1 my-4 rounded-xl bg-white p-4 shadow md:order-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="text-lg font-medium">{order.customer_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Table Number</p>
            <p className="text-lg font-medium">{order.table_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Grand Total</p>
            <p className="text-lg font-semibold text-green-700">
              ${order.total}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Order Status</p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                order.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="order-2 rounded-xl bg-white p-4 shadow md:order-3">
        <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-4 md:grid-cols-2 md:gap-x-4 md:gap-x-8">
          {order.cart.map((item: ICart, index: number) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img
                src={item.menuItem.image_url}
                alt={item.menuItem.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-lg font-medium">{item.menuItem.name}</p>
                <p className="text-sm text-gray-500">${item.menuItem.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Qty</p>
                <p className="font-semibold">{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
