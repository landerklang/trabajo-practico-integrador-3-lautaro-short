import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const IsLogged = localStorage.getItem("isLogged");

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">TaskManager</h1>

      <div className="flex gap-4">
        {IsLogged ? (
          <>
            <Link
              to="/Home"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/Tasks"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Tasks
            </Link>

            <Link
              to="/Profile"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/Login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/Register"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
