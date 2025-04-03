import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { sidebarMenu } from "./Sidebar.constant";
import { cn } from "../../../../utils/cn";

const SidebarAdmin = () => {
  const location = useLocation();
  return (
    <div className="fixed relative z-50 flex h-screen w-full max-w-20 translate-x-0 flex-col items-center justify-between bg-gray-100 py-5 transition-all">
      <div className="py-6">
        <div className="rounded-full bg-white p-3 shadow-md">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          {sidebarMenu.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <>
                <Link key={index} to={item.link}>
                  <a
                    className={cn(
                      "text-black-500 to-black-700 flex h-12 w-12 items-center justify-center rounded-full from-yellow-950 shadow-lg transition-colors hover:bg-gradient-to-tr hover:text-white",
                      {
                        "to-black-700 hover:to-black-500 bg-gradient-to-tr from-yellow-950 text-white hover:from-yellow-900":
                          isActive,
                      },
                    )}
                  >
                    {item.icon}
                  </a>
                </Link>
              </>
            );
          })}
        </nav>
      </div>
      <button
        className={`text-red flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-700 transition-colors hover:bg-red-700 hover:text-white`}
      >
        <LogOut />
      </button>
    </div>
  );
};

export default SidebarAdmin;
