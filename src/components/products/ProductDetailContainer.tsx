import { use } from "react";
import { Product } from "../../data/product";
import { ItemCount } from "../ItemCount";
import { CartContext } from "../../context/CartContext";

interface Props {
  product: Product;
}

export const ProductDetailContainer = ({ product }: Props) => {
  const { addItem } = use(CartContext);

  const onAddToCart = (count: number) => {
    addItem(product, count);
  };
  return (
    <article className="w-full flex flex-col items-center justify-center gap-5 mt-6 lg:flex-row">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
        <img
          src={product.img}
          alt={product.title}
          className="  w-full h-80 object-cover"
        />
      </div>
      <div className="rounded-xl lg:h-80  border sm:w-120 border-white/10 bg-white/5 p-4">
        <p className="opacity-70 mb-1 capitalize">{product.category}</p>
        <h2 className="text-2xl font-semibold">{product.title}</h2>

        <p className="my-4 opacity-90 ">
          <span className="opacity-70">Descripción:</span> {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-6">
          <span className="text-xl font-semibold">USD: {product.price} </span>
          <span className="text-xl opacity-70"> Stock: {product.stock} </span>
        </div>
        <ItemCount stock={product.stock} onAddToCart={onAddToCart} />
      </div>
    </article>
  );
};
