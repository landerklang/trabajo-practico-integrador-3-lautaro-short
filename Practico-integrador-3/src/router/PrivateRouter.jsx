import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const PrivateRoutes = () => {
  const isLogged = localStorage.getItem("isLogged");
  return isLogged ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    ((<Navigate to="/Login" />), (<Navigate to="/Register" />))
  );
};
