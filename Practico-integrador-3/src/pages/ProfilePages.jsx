import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [Profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      } else {
        console.log("Error al encontrar el usuario");
      }
    } catch (error) {
      alert("Error del servidor");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isLogged");
      navigate("/Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {loading ? (
        // 🔵 LOADING SPINNER
        <div className="flex justify-center items-center flex-col gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-medium">Cargando...</p>
        </div>
      ) : (
        // 🟦 CARD DEL PERFIL
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Información del Usuario
          </h1>

          <div className="space-y-3 text-gray-800">
            <p className="text-lg">
              <span className="font-semibold">ID:</span> {Profile?.id}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Nombre:</span> {Profile?.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Apellido:</span>{" "}
              {Profile?.lastname}
            </p>
          </div>

          {/* 🔴 BOTÓN LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl font-semibold 
              hover:bg-red-600 transition duration-200 active:scale-[0.97]"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};
