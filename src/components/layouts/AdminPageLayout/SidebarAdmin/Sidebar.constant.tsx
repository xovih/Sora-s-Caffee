import { ShoppingCart, List, Star } from "lucide-react";
import { ReactElement } from "react";

interface PropTypes {
  icon: ReactElement;
  link: string;
}

export const sidebarMenu: PropTypes[] = [
  {
    icon: <List />,
    link: "/order-list",
  },
  {
    icon: <ShoppingCart />,
    link: "/order-add",
  },
  {
    icon: <Star />,
    link: "/reviews",
  },
];
