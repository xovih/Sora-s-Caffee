import { IMenu } from "./menu";

interface ICartItem {
  menuItemId?: string;
  quantity: number;
  notes?: string;
  price?: number;
  name?: string;
  menuItem?: IMenu;
  status?: string;
  total?: number;
}

interface ICart {
  menuItem: {
    category: string;
    id: string;
    image_url: string;
    name: string;
    price: number;
  };
  notes?: string;
  quantity: number;
}

interface IOrder {
  id?: string;
  customerName: string;
  tableNumber: number;
  cart?: ICartItem[];
}

export type { ICartItem, IOrder, ICart };
