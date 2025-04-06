import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PropTypes {
  children: ReactNode;
}

const ProtectedRoute = (props: PropTypes) => {
  const { children } = props;
  const navigate = useNavigate();

  const auth = localStorage.getItem("auth");
  const currentRoute = useLocation().pathname;

  if (!auth && currentRoute !== "/") {
    navigate("/");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
