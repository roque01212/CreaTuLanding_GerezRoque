import { Product } from "../../data/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  showCategory?: boolean;
}

export const ProductListContainer = ({ products, showCategory }: Props) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} showCategory={showCategory} />
      ))}
    </section>
  );
};
