import { useContext, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router";
import { CartContext } from "../../context/CartContext";
import { PageHeader } from "../../components/ui/PageHeader";
import { CustomButton } from "../../components/CustomButton";
import { createBuyOrder } from "../../services/products";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { carts, totalItems, clearCart } = useContext(CartContext);

  const totalPrice = useMemo(
    () =>
      carts.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [carts],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (carts.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" subtitle="Tu carrito está vacío" />
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="opacity-80">Agregá productos antes de finalizar.</p>
          <div className="mt-4">
            <Link to="/" className="underline opacity-90 hover:opacity-100">
              Volver al inicio
            </Link>
          </div>
        </div>
      </>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError("Nombre y email son obligatorios.");
      return;
    }

    try {
      setSubmitting(true);

      const items = carts.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const buyOrder = {
        buyer: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || "",
          address: address.trim() || "",
        },
        items,
        totalItems,
        totalPrice,
      };
      const orderId = await createBuyOrder(buyOrder);

      clearCart();
      navigate(`/checkout/success/${orderId}`);
    } catch (err) {
      setError(String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Completá tus datos para finalizar"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3"
        >
          <div>
            <label className="text-sm opacity-80">Nombre *</label>
            <input
              className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Email *</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Teléfono</label>
            <input
              className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 ..."
            />
          </div>

          <div>
            <label className="text-sm opacity-80">Dirección</label>
            <input
              className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, número, ciudad"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="pt-2 flex gap-2">
            <CustomButton
              variant="secondary"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Volver
            </CustomButton>

            <CustomButton variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Procesando..." : "Confirmar compra"}
            </CustomButton>
          </div>
        </form>

        {/* RESUMEN */}
        <aside className="rounded-xl border border-white/10 bg-white/5 p-4 h-fit lg:sticky lg:top-4">
          <h3 className="text-lg font-semibold">Resumen</h3>

          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between opacity-80">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between opacity-80">
              <span>Total</span>
              <span className="font-semibold">USD {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-white/10">
            <p className="text-xs opacity-60">
              Se guardará tu compra en Firestore.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};
