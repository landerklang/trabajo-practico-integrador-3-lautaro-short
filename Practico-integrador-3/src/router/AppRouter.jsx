import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRouter.jsx";
import { PrivateRoutes } from "./PrivateRouter.jsx";
import { LoginPage } from "../pages/auth/LoginPage.jsx";
import { RegisterPage } from "../pages/auth/RegisterPage.jsx";
import { ProfilePage } from "../pages/ProfilePages.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { TasksPage } from "../pages/TasksPage.jsx";
import { PostTasksPages } from "../pages/PostTasksPages.jsx";
import { PutTasksPages } from "../pages/PutTasksPages.jsx";
// import { PutTasksPages } from "../pages/PutTasksPages.jsx";

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
        <Route path="/Tasks" element={<TasksPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/CreatedTasks" element={<PostTasksPages />} />
        <Route path="/PutTasks" element={<PutTasksPages />} />
        {/* <Route path="/PutTasks" element={<PutTasksPages />} /> */}
        <Route path="*" element={<Navigate to="/Home" />} />
        <Route path="/" element={<Navigate to="/Home" />} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/register" />} /> */}
    </Routes>
  );
};
