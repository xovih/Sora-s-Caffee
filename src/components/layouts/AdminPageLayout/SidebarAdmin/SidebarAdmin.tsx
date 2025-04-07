import { LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarMenu } from "./Sidebar.constant";
import { cn } from "../../../../utils/cn";
import { removeLocalStorage } from "../../../../utils/storage";

const SidebarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="relative z-50 flex h-screen w-full max-w-20 translate-x-0 flex-col items-center justify-between bg-gray-100 py-5 transition-all">
      <div className="py-6">
        <div className="rounded-full bg-white p-3 shadow-md">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          {sidebarMenu.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <Link key={item.link} to={item.link}>
                <div
                  key={index}
                  className={cn(
                    "text-black-500 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors hover:bg-yellow-950 hover:text-white",
                    {
                      "bg-yellow-950 text-white hover:bg-white hover:text-black":
                        isActive,
                    },
                  )}
                >
                  {item.icon}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        className={`text-red flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-700 transition-colors hover:bg-red-700 hover:text-white`}
        onClick={() => {
          removeLocalStorage("auth");
          navigate("/");
        }}
      >
        <LogOut />
      </button>
    </div>
  );
};

export default SidebarAdmin;
