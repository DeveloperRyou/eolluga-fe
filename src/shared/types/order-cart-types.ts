interface CartMenuOptionT {
  categoryName: string;
  name: string;
  price: number;
}

interface CartItemT {
  name: string;
  price: number;
  count: number;
  image: string | null | undefined;
  options: CartMenuOptionT[];
}

type CartItemsT = CartItemT[];

interface OrderHistoryItemT {
  orderHistoryId: string;
  paymentHistoryId: string;
  totalPrice: number;
  status: "PENDING" | "APPROVED" | "DISAPPROVED";
  orderDetail: CartItemsT;
  createdAt: string;
  updatedAt: string;
}

type OrderHistoryT = OrderHistoryItemT[];

export type {
  CartMenuOptionT,
  CartItemT,
  CartItemsT,
  OrderHistoryItemT,
  OrderHistoryT,
};
