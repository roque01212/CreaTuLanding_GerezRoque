import { Link } from "react-router";
import { Product } from "../../data/product";

interface Props {
  product: Product;
  showCategory?: boolean;
}
export const ProductCard = ({
  product,
  showCategory: showCategory = false,
}: Props) => {
  return (
    <article className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition">
      <Link to={`/productos/${product.id}`}>
        <img
          src={`${product.img}`}
          alt={`${product.title}`}
          className="w-full h-40 object-cover rounded-xl"
          loading="lazy"
        />
      </Link>

      <div className="p-3">
        <h3 className="font-medium leading-tight">{product.title}</h3>
        {showCategory && (
          <p className="text-sm capitalize opacity-70 mt-1">
            {product.category}
          </p>
        )}

        <div className="flex items-center mt-2 justify-between">
          <span className="font-semibold">${product.price}</span>
          <span className="text-sm opacity-70">Stock: {product.stock}</span>
        </div>

        <Link
          to={`/productos/${product.id}`}
          className="inline-block mt-3 text-sm p-2 rounded-md opacity-90 hover:underline hover:rounded-md hover:opacity-100 border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition  "
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
};
