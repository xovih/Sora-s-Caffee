/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { X } from "lucide-react";
import { tables } from "../AdminOrderPage.contant";
import useCreateOrder from "../useCreateOrder";
import { Controller } from "react-hook-form";
import { IOrder } from "../../../../../types/orders";
import useCartStore from "../../../../stores/CartStore";
import SmallRoundedButton from "../../../../ui/SmallRoundedButton";
import { useEffect } from "react";

const ProductCart = () => {
  const {
    control,
    errors,
    reset,

    mutateCreateOrder,
    handleSubmitOrder,

    isPendingCreateOrder,
    isSuccessCreateOrder,
  } = useCreateOrder();

  const carts = useCartStore((state) => state.carts);
  const increase = useCartStore((state) => state.increaseQty);
  const decrease = useCartStore((state) => state.decreaseQty);
  const clearCarts = useCartStore((state) => state.clear);

  const handleCreateOrder = (data: IOrder) => {
    const payload = { ...data, cart: carts };
    mutateCreateOrder(payload);
  };

  useEffect(() => {
    reset();
    clearCarts();
  }, [isSuccessCreateOrder]);

  return (
    <div className="order-1 w-full lg:order-2 lg:w-1/3">
      <Card className="bg-gray-300 shadow-md">
        <CardBody>
          <form
            className="space-y-4 px-2 py-3"
            onSubmit={handleSubmitOrder(handleCreateOrder)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-l flex items-center gap-2 font-semibold">
                Customer Information
              </h2>
              <Button
                isIconOnly
                className="bg-white bg-opacity-80 text-red-700"
                onPress={() => {
                  reset();
                  clearCarts();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className=""
                  type="text"
                  label="Customer Name"
                  isInvalid={errors.customerName !== undefined}
                  errorMessage={errors.customerName?.message}
                />
              )}
            />

            <Controller
              name="tableNumber"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Table Number"
                  disallowEmptySelection
                  isInvalid={errors.tableNumber !== undefined}
                  errorMessage={errors.tableNumber?.message}
                >
                  {tables.map((item) => (
                    <SelectItem key={item.value} textValue={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            <h2 className="text-lfont-semibold">Current Order</h2>
            {carts.length == 0 ? (
              <p className="text-sm text-gray-500">Cart is empty</p>
            ) : (
              <div className="rounded-xl bg-white bg-opacity-70 px-3 py-2">
                <ul>
                  {carts.map((item) => (
                    <li
                      key={item.menuItemId}
                      className="flex items-center justify-between py-2"
                    >
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <SmallRoundedButton
                          onClick={() => increase(`${item.menuItemId}`)}
                        >
                          +
                        </SmallRoundedButton>
                        <span className="px-2">{item.quantity}</span>
                        <SmallRoundedButton
                          onClick={() => decrease(`${item.menuItemId}`)}
                        >
                          -
                        </SmallRoundedButton>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="my-1 mt-4 flex w-full bg-yellow-950 font-semibold text-white transition-colors"
                  type="submit"
                >
                  {isPendingCreateOrder ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    "Checkout"
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCart;
