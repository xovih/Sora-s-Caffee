/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useLoginModal from "./useLoginModal";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

const LoginModal = (props: PropTypes) => {
  const { isOpen, onOpenChange, onClose } = props;

  const {
    control,
    errors,
    handleLogin,
    handleSubmitLogin,
    isPendingLogin,
    isSuccessLogin,
  } = useLoginModal();

  useEffect(() => {
    onClose();
  }, [isSuccessLogin]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitLogin(handleLogin)}>
        <ModalContent className="m-4">
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Email"
                    variant="bordered"
                    placeholder="Email"
                    type="text"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Password"
                    variant="bordered"
                    placeholder="Password"
                    type="password"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              type="button"
              onPress={onClose}
              disabled={isPendingLogin}
            >
              Batal
            </Button>
            <Button color="primary" type="submit" disabled={isPendingLogin}>
              {isPendingLogin ? <Spinner size="sm" color="white" /> : "Login"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default LoginModal;
