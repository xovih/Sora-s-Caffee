import { Home, ShoppingCart, List } from "lucide-react";
import { ReactElement } from "react";

interface PropTypes {
  icon: ReactElement;
  link: string;
}

export const sidebarMenu: PropTypes[] = [
  {
    icon: <Home />,
    link: "/home",
  },
  {
    icon: <List />,
    link: "/order-list",
  },
  {
    icon: <ShoppingCart />,
    link: "/order-add",
  },
];
