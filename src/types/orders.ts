interface ICartItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
  price?: number;
  name?: string;
}

interface IOrder {
  customerName: string;
  tableNumber: number;
  cart?: ICartItem[];
}

export type { ICartItem, IOrder };
