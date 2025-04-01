interface ICartItem {
  menuItemId: string;
  quantity: number;
  notes: string;
}

interface IOrder {
  customerName: string;
  tableNumber: number;
  cart: ICartItem[];
}

export type { ICartItem, IOrder };
