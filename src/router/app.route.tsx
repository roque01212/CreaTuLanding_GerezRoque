import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "../pages/home/HomePage";
import { ProductDetailPage } from "../pages/product-detail/ProductDetailPage";
import { AppLayout } from "../layouts/AppLayout";
import { CategoryPage } from "../pages/category/CategoryPage";
import { CartPage } from "../pages/cart/CartPage";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { CheckoutSuccessPage } from "../pages/checkout/CheckoutSuccessPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "categoria/:slug",
        element: <CategoryPage />,
      },
      {
        path: "productos/:idProduct",
        element: <ProductDetailPage />,
      },
      {
        path: "carrito",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "checkout/success/:orderId",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);
