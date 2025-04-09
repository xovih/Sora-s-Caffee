/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import TopNavLanding from "./TopNavLanding/TopNavLanding";
import FooterLanding from "./FooterLanding";
import useToasterStore, { defaultToaster } from "../../stores/ToasterStore";
import Toaster from "../../ui/Toaster";
import { useDisclosure } from "@heroui/react";
import LoginModal from "../../views/LoginModal/LoginModal";

interface PropTypes {
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { children } = props;
  const toaster = useToasterStore((state) => state.toaster);
  const setToaster = useToasterStore((state) => state.setToaster);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [toaster]);

  const loginModal = useDisclosure();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <TopNavLanding brand="Sora's Coffee 🍵" onLogin={loginModal.onOpen} />
      {children}
      <FooterLanding />
      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
      <LoginModal {...loginModal} />
    </div>
  );
};

export default LandingPageLayout;
