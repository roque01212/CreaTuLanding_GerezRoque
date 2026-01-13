import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductById } from "../../assets/services/products.mock.service";
import { Product } from "../../data/product";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProductDetailContainer } from "../../components/products/ProductDetailContainer";
import { CustomButton } from "../../components/CustomButton";

export const ProductDetailPage = () => {
  const { idProduct } = useParams<{ idProduct: string }>();

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!idProduct) {
        setError("No se encontro el producto");
        setProduct(null);
        return;
      }

      const response = await getProductById(idProduct);
      setProduct(response);
    } catch (e) {
      setError(String(e));
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [idProduct]);

  if (loading) {
    return (
      <>
        <PageHeader title="Cargando..." />
        <p className="text-center opacity-70">Cargando detalle del producto</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader title="Detalle del producto" />
        <p className="text-center text-red-400">Error: {error}</p>
        <div className="flex justify-center mt-4">
          <CustomButton variant="ghost" onClick={() => navigate("/")}>
            volver
          </CustomButton>
        </div>
      </>
    );
  }

  return (
    <>
      {!product ? (
        <>
          <PageHeader title="Detalle del producto" />
          <p className="text-center opacity-70">No se encontró el producto.</p>
          <div className="flex justify-center mt-4">
            <CustomButton variant="ghost" onClick={() => navigate("/")}>
              volver
            </CustomButton>
          </div>
        </>
      ) : (
        <>
          <PageHeader title="Comida y Bebidas para sentirse bien" />
          <ProductDetailContainer product={product} />
        </>
      )}
    </>
  );
};
