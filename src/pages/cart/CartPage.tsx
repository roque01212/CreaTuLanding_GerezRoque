import { use, useMemo } from "react";
import { CartContext } from "../../context/CartContext";
import { PageHeader } from "../../components/ui/PageHeader";
import { Link } from "react-router";
import { CustomButton } from "../../components/CustomButton";

export const CartPage = () => {
  const {
    cart,
    totalItems,
    removeItem,
    clearCart,
    decreaseItem,
    increaseItem,
  } = use(CartContext);

  const totalPrice = useMemo(
    () =>
      cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <>
        <PageHeader
          title="Carrito de Compras"
          subtitle="Todavia no agregaste Productos"
        />

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="opacity-80">Tu carrito Esta vacio.</p>
          <p className="opacity-60 mt-1">
            Explora nuestros productos y agrega favoritos.
          </p>

          <div className="mt-4 flex justify-center">
            <Link to="/" className="underline opacity-90 hover:opacity-100">
              Volver al inicio
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Carrito de Compras"
        subtitle={`Tienes ${totalItems} ${
          totalItems === 1 ? "producto" : "productos"
        } en el carrito`}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {cart.map(({ product, quantity }) => {
            const subTotal = product.price * quantity;

            return (
              <article
                key={product.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-4 items-center"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg border border-white/10 "
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{product.title}</p>
                  <p className="text-sm opacity-80 capitalize ">
                    {product.category}
                  </p>

                  <div className="mt-2 flex items-center flex-wrap gap-4 text-sm">
                    <span className="opacity-90">Cantidad: {quantity}</span>
                    <span className="opacity-90">
                      Precio USD: {product.price.toFixed(2)}
                    </span>
                    <span className="font-semibold">
                      Subtotal: USD: {subTotal.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <CustomButton
                        variant="ghost"
                        onClick={() => decreaseItem(product.id)}
                      >
                        -
                      </CustomButton>

                      <span className="min-w-8 text-center">{quantity}</span>

                      <CustomButton
                        variant="ghost"
                        onClick={() => increaseItem(product.id)}
                        disabled={quantity >= product.stock}
                      >
                        +
                      </CustomButton>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <CustomButton onClick={() => removeItem(product.id)}>
                    Quitar
                  </CustomButton>

                  <Link
                    to={`/productos/${product.id}`}
                    className="text-xs underline opacity-80 hover:opacity-100 text-center"
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        {/* RESUMEN */}
        <aside className="rounded-xl border mt-3 border-white/10 bg-white/5 p-4 h-fit">
          <h3 className="text-lg font-semibold">Resumen</h3>

          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between opacity-80">
              <span>Totoal Productos</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between opacity-80">
              <span>Total a pagar</span>
              <span className="font-semibold">USD {totalPrice.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-white/10" />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <CustomButton
              variant="primary"
              onClick={() => console.log("Checkout (más adelante)")}
            >
              Finalizar compra
            </CustomButton>

            <CustomButton variant="secondary" onClick={clearCart}>
              Vaciar carrito
            </CustomButton>
          </div>

          <p className="mt-3 text-xs opacity-60">
            * Checkout es solo visual por ahora.
          </p>
        </aside>
      </div>
    </>
  );
};
