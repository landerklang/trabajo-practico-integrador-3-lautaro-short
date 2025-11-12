import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRouter.jsx";
import { PrivateRoutes } from "./PrivateRouter.jsx";
import { LoginPage } from "../pages/auth/LoginPage.jsx";
import { RegisterPage } from "../pages/auth/RegisterPage.jsx";
import { ProfilePage } from "../pages/ProfilePages.jsx";
import { HomePage } from "../pages/HomePage.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/Login" />} />
        <Route path="/" element={<Navigate to="/Login" />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Tasks" element />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/Home" />} />
        <Route path="/" element={<Navigate to="/Home" />} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/register" />} /> */}
    </Routes>
  );
};
