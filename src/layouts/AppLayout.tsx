import { CustomNavbar } from "../components/CustomNavbar";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <>
      <CustomNavbar />
      <main className="p-4 ">
        <Outlet />
      </main>
    </>
  );
};
