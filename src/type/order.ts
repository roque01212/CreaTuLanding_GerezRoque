import type { Timestamp } from "firebase/firestore";

export interface Buyer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface BuyOrder {
  buyer: Buyer;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt?: Timestamp;
}
