import { useNavigate, useParams } from "react-router";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProductListContainer } from "../../components/products/ProductListContainer";
import { useEffect, useState } from "react";
import { getProductByCategory } from "../../assets/services/products.mock.service";
import { Product } from "../../data/product";
import { CustomButton } from "../../components/CustomButton";
const categoriesInclud = ["bebidas", "comidas", "postres"];

export const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  console.log(slug);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!slug || !categoriesInclud.includes(slug)) {
        setError("Categoria no valida");
        setProducts([]);
        return;
      }

      const response = await getProductByCategory(slug);
      setProducts(response);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageHeader title={`${slug}`} />
        <p className="text-center opacity-70">Cargando Productos...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader title="Hola bienvenidos a Feed Good Food" />
        <p className="text-red-600 text-center">Error: {error}</p>
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
      <PageHeader title={` ${slug}`} subtitle="Elige tu favorito" />
      <ProductListContainer products={products} />
    </>
  );
};
