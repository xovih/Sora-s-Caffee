/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import useToasterStore, { defaultToaster } from "../../stores/ToasterStore";
import Toaster from "../../ui/Toaster";
import SidebarAdmin from "./SidebarAdmin";

interface PropTypes {
  children: ReactNode;
  title?: string | "";
}

const AdminPageLayout = (props: PropTypes) => {
  const { children, title } = props;

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

  return (
    <div className="max-w-screen-3xl 3xl:container flex bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin />

      <div className="h-screen w-full overflow-y-auto p-8">
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
