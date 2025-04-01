import * as yup from "yup";
import { ILogin } from "../../../types/auth";
import authService from "../../../services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import useToasterStore from "../../stores/ToasterStore";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useLoginModal = () => {
  const setToaster = useToasterStore((state) => state.setToaster);
  const navigate = useNavigate();

  const login = async (payload: ILogin) => {
    const res = await authService.login(payload);
    return res.data;
  };

  const {
    control,
    handleSubmit: handleSubmitLogin,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    mutate: mutateLogin,
    isPending: isPendingLogin,
    isSuccess: isSuccessLogin,
  } = useMutation({
    mutationFn: login,
    onError: (error) => {
      const err = error as any;
      const message =
        err.status === 401 ? "Invalid Credentials" : "Gagal Login";
      setToaster({
        type: "error",
        message: message,
      });
    },
    onSuccess: (data) => {
      setToaster({
        type: "success",
        message: "Berhasil Login",
      });
      const token = data.token;
      setLocalStorage("auth", token);
      reset();
      navigate("/orders");
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    control,
    errors,
    isPendingLogin,
    handleLogin,
    handleSubmitLogin,
    isSuccessLogin,
    reset,
  };
};

export default useLoginModal;
