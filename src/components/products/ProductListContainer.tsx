import { Product } from "../../type/product";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  showCategory?: boolean;
}

export const ProductListContainer = ({ products, showCategory }: Props) => {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} showCategory={showCategory} />
      ))}
    </section>
  );
};
