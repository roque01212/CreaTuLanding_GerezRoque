import { Link, NavLink } from "react-router";
import CartWidget from "./CartWidget";

export const CustomNavbar = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-semibold underline" : "opacity-80 hover:opacity-100";
  return (
    <header className="w-full border-b flex">
      {/* <nav className="flex items-center justify-between w-full p-4"> */}
      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-4">
        <Link to={"/"} className="text-2xl font-thin">
          Feed Good Food
        </Link>

        <ul className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-6">
          <li>
            <NavLink to={"/categoria/comidas"} className={navClass}>
              Comidas
            </NavLink>
          </li>

          <li>
            <NavLink to={"/categoria/bebidas"} className={navClass}>
              Bebidas
            </NavLink>
          </li>
          <li>
            <NavLink to={"/categoria/postres"} className={navClass}>
              Postres
            </NavLink>
          </li>
          <li>
            <Link to="/carrito" className="opacity-90 hover:opacity-100">
              <CartWidget count={10} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
