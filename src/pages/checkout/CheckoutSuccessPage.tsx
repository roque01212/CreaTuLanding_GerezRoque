import { Link, useParams } from "react-router";
import { PageHeader } from "../../components/ui/PageHeader";

export const CheckoutSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <>
      <PageHeader
        title="Compra confirmada ✅"
        subtitle="Gracias por tu compra"
      />

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="opacity-80">Tu codigo de orden es:</p>
        <p className="mt-2 text-lg font-semibold">{orderId}</p>

        <div className="mt-4">
          <Link to="/" className="underline opacity-90 hover:opacity-100">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
};
