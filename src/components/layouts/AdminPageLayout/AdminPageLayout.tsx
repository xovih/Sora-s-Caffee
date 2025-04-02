import { ReactNode, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@heroui/react";
import useToasterStore, { defaultToaster } from "../../stores/ToasterStore";
import Toaster from "../../ui/Toaster";

interface PropTypes {
  children: ReactNode;
}

const AdminPageLayout = (props: PropTypes) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 p-4 text-white transition-transform lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <Button
            variant="light"
            onPress={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4 space-y-2">
          <Button variant="light" className="w-full text-left">
            Dashboard
          </Button>
          <Button variant="light" className="w-full text-left">
            Settings
          </Button>
          <Button variant="light" className="w-full text-left">
            Profile
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
          <Button
            variant="light"
            className="lg:hidden"
            onPress={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Top Navbar</h1>
        </header>

        {/* Content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>

      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
    </div>
  );
};

export default AdminPageLayout;
