/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import useToasterStore from "../../../stores/ToasterStore";
import { IOrder } from "../../../../types/orders";
import orderService from "../../../../services/order.service";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "../../../../utils/storage";

const orderSchema = yup.object().shape({
  customerName: yup.string().min(3).required(),
  tableNumber: yup.number().min(1).max(10).required(),
});

const useCreateOrder = () => {
  const setToaster = useToasterStore((state) => state.setToaster);

  const navigate = useNavigate();

  const createOrder = async (payload: IOrder) => {
    const res = await orderService.create(payload);

    return res.data;
  };

  const {
    control,
    handleSubmit: handleSubmitOrder,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const {
    mutate: mutateCreateOrder,
    isPending: isPendingCreateOrder,
    isSuccess: isSuccessCreateOrder,
  } = useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      const err = error as any;
      if (err.status === 401) {
        removeLocalStorage("auth");
        setToaster({
          type: "error",
          message: "Auth Token Expired, Please Login First.",
        });

        navigate("/");
        return;
      }

      setToaster({
        type: "error",
        message: "Failed to create order.",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Order created successfully.",
      });
    },
  });

  return {
    control,
    errors,
    reset,

    mutateCreateOrder,
    handleSubmitOrder,
    isPendingCreateOrder,
    isSuccessCreateOrder,
  };
};

export default useCreateOrder;
