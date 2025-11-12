import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRouter.jsx";
import { PrivateRoutes } from "./PrivateRouter.jsx";
import { LoginPages } from "../pages/auth/LoginPages.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/Login" element={<LoginPages />} />
        <Route path="/Register" element={<RegisterPages />} />
        <Route path="*" element={<Navigate to="/Login" />} />
        <Route path="/" element={<Navigate to="/Login" />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Tasks" element />
        <Route path="/Profile" element />
        <Route path="*" element={<Navigate to="/Home" />} />
        <Route path="/" element={<Navigate to="/Home" />} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/register" />} /> */}
    </Routes>
  );
};
