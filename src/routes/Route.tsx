import { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import AdminOrderPage from "../components/pages/Admin/AdminOrderPage";
import ProtectedRoute from "./ProtectedRoute";
import OrderListPage from "../components/pages/Admin/OrderListPage/OrderListPage";
import OrderDetailPage from "../components/pages/Admin/OrderDetailPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/order-list",
    element: (
      <ProtectedRoute>
        <OrderListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-list/:id",
    element: (
      <ProtectedRoute>
        <OrderDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-add",
    element: (
      <ProtectedRoute>
        <AdminOrderPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
