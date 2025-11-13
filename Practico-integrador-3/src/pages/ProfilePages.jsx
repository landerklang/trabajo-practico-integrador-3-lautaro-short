import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    const navigate = useNavigate();
    return navigate("/login");
  };
  return (
    <>
      <h1>este es el perfil de </h1>
      <h1>id:</h1>
      <h1>Nombre:</h1>
      <h1>Apellido:</h1>
    </>
  );
};
