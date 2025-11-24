import { useEffect, useState } from "react";
import { Footer } from "../components/Footer.jsx";

export const HomePage = () => {
  const [home, setHome] = useState(null);
  const [tasks, setTasks] = useState([]);

  const FetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setHome(data.user);
    } catch (error) {
      alert("Error al cargar el usuario");
    }
  };

  const FetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/tasks-by-user", {
        credentials: "include",
      });
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      alert("Error del servidor");
    }
  };

  useEffect(() => {
    FetchProfile();
    FetchTasks();
  }, []);

  const completed = tasks.filter((t) => t.is_completed).length;
  const pending = tasks.filter((t) => !t.is_completed).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6">
          Bienvenido, <span className="text-blue-600">{home?.name}</span>
        </h1>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* Total */}
          <div className="bg-white shadow-md p-5 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold">Total tareas</h2>
            <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
          </div>

          {/* Completadas */}
          <div className="bg-green-100 shadow-md p-5 rounded-xl border border-green-300">
            <h2 className="text-lg font-semibold text-green-800">
              Completadas
            </h2>
            <p className="text-3xl font-bold text-green-700">{completed}</p>
          </div>

          {/* Incompletas */}
          <div className="bg-red-100 shadow-md p-5 rounded-xl border border-red-300">
            <h2 className="text-lg font-semibold text-red-800">Incompletas</h2>
            <p className="text-3xl font-bold text-red-700">{pending}</p>
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};
