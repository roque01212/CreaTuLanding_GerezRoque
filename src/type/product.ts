import { ProductCategory } from "./category";

export interface Product {
  id: string; // doc.id
  title: string;
  price: number;
  category: ProductCategory;
  stock: number;
  img: string;
  description: string;
}
