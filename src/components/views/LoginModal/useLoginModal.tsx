import * as yup from "yup";
import { ILogin } from "../../../types/auth";
import { loginService } from "../../../services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import useToasterStore from "../../stores/ToasterStore";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useLoginModal = () => {
  const setToaster = useToasterStore((state) => state.setToaster);

  const login = async (payload: ILogin) => {
    const data = await loginService(payload);
    return data;
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
    onError: () => {
      setToaster({ type: "error", message: "Gagal Login" });
    },
    onSuccess: (data) => {
      setToaster({
        type: "success",
        message: "Berhasil Login",
      });
      const token = data.token;
      localStorage.setItem("auth", token);
      reset();
      // navigate()
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
