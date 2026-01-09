import { RouterProvider } from "react-router";
import { appRouter } from "./assets/router/app.route";

export const TiendaApp = () => {
  return (
    <div className="bg-gradient ">
      <RouterProvider router={appRouter} />
    </div>
  );
};
