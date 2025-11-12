import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    const navigate = useNavigate();
    return navigate("/login");
  };
  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/Tasks">Tasks</Link>
      <Link to="/Profile">Profile</Link>
      <Link onClick={handleLogout}>Logout</Link>
      <Link to="/Login">Login</Link>
      <Link to="/Register">Register</Link>
    </nav>
  );
};
