import { PageHeader } from "../../components/ui/PageHeader";
import { ProductListContainer } from "../../components/products/ProductListContainer";
import { getProducts } from "../../services/products.mock.service";
import { useEffect, useState } from "react";
import type { Product } from "../../data/product";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <>
        <PageHeader title="Hola bienvenidos a Feed Good Food" />
        <p className="opacity-70 text-center">Cargando productos...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <PageHeader title="Hola bienvenidos a Feed Good Food" />
        <p className="text-red-600">Error: {error}</p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Hola bienvenidos a Feed Good Food"
        subtitle="Elige favorito"
      />
      <ProductListContainer products={products} showCategory />
    </>
  );
};
