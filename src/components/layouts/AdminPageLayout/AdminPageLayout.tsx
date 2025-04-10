/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import useToasterStore, { defaultToaster } from "../../stores/ToasterStore";
import Toaster from "../../ui/Toaster";
import SidebarAdmin from "./SidebarAdmin";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import { cn } from "../../../utils/cn";
import useMediaQuery from "./useMediaQuery";

interface PropTypes {
  children: ReactNode;
  title?: string | "";
}

const AdminPageLayout = (props: PropTypes) => {
  const { children, title } = props;

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toaster = useToasterStore((state) => state.toaster);
  const setToaster = useToasterStore((state) => state.setToaster);

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [toaster]);

  return (
    <div className="max-w-screen-3xl 3xl:container flex bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin isOpen={isOpen} />

      <div className="h-screen w-full overflow-y-auto p-8">
        <Navbar
          className="block flex justify-between bg-transparent px-0 md:hidden"
          isBlurred={false}
          classNames={{ wrapper: "p-0" }}
          position="static"
        >
          <h1 className="text-xl font-bold">Sora's Coffee</h1>
          <NavbarMenuToggle
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            onClick={() => setIsOpen(!isOpen)}
            className={cn("lg:hidden", { block: isOpen })}
          />
        </Navbar>
        <div className="flex flex-col gap-4 p-4">
          {/* Page Title */}
          <h1 className="text-center text-2xl font-bold lg:text-left">
            {title}
          </h1>

          <div className="flex flex-col gap-4 lg:flex-row">{children}</div>
        </div>
      </div>

      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
    </div>
  );
};

export default AdminPageLayout;
