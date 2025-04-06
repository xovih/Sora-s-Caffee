import { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import AdminOrderPage from "../components/pages/Admin/AdminOrderPage";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/order-list",
    element: (
      <ProtectedRoute>
        <AdminOrderPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
