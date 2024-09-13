export interface Order {
  id: string;
  userId: string;
  status: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderItems {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderItem {
  itemId: number;
  quantity: number;
}
