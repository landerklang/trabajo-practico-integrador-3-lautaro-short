import { Navigate, Route, Routes } from "react-router";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element />
      <Route path="/login" element />
    </Routes>
  );
};
