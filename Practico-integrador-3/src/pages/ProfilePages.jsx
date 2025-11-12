import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    const navigate = useNavigate();
    return navigate("/login");
  };
  return (
    <div>
      <h1>hola</h1>
    </div>
  );
};
