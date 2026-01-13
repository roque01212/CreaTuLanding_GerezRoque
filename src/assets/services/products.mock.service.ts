import { Product, products } from "../../data/product";

export const getProducts = (): Promise<Product[]> => {
  const promiseProducts = new Promise<Product[]>((resolve, reject) => {
    setTimeout(() => {
      if (!products) {
        return reject("Producto no encontrado");
      }
      resolve(products);
    }, 1500);
  });
  return promiseProducts;
};

export const getProductById = (id: string): Promise<Product> => {
  return new Promise<Product>((resolve, reject) => {
    const product = products.find((p) => p.id === +id);
    setTimeout(() => {
      if (!product) {
        return reject("Producto no encontrado");
      }
      resolve(product);
    }, 1500);
  });
};

export const getProductByCategory = (category: string): Promise<Product[]> => {
  return new Promise<Product[]>((resolve, reject) => {
    const productsByCategory = products.filter(
      (products) => products.category === category
    );
    setTimeout(() => {
      if (!productsByCategory) {
        return reject("No existen productos para esa categoria");
      }
      resolve(productsByCategory);
    }, 1500);
  });
};
