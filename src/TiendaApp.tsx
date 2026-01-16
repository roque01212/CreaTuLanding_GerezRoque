import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.route";
import { CartContextProvider } from "./context/CartContext";

export const TiendaApp = () => {
  return (
    <CartContextProvider>
      <div className="bg-gradient ">
        <RouterProvider router={appRouter} />
      </div>
    </CartContextProvider>
  );
};
