import { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import AdminOrderPage from "../components/pages/Admin/AdminOrderPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/order-list",
    element: <AdminOrderPage />,
  },
];

export default routes;
