import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const TasksPage = () => {
  const [Tasks, setTasks] = useState([]);
  const [loading, setloading] = useState(false);

  const FetchTasks = async () => {
    setloading(true);
    try {
      const res = await fetch("http://localhost:4000/api/tasks-by-user", {
        credentials: "include",
      });
      const data = await res.json();
      setTasks(data);
      await new Promise((resolver) => setTimeout(resolver, 1000));
      setloading(false);
    } catch (error) {
      alert("error del servidor");
    }
  };

  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-2xl">
          {/* HEADER BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-between">
            <a
              href="/CreatedTasks"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
            >
              Crear tarea
            </a>

            <a
              href="/PutTasks"
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-center hover:bg-yellow-700 transition"
            >
              Editar tareas
            </a>

            <a
              href="/DeletedTasks"
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-center hover:bg-red-700 transition"
            >
              Eliminar tarea
            </a>
          </div>

          {/* NO TASKS */}
          {Tasks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg font-medium">
              El usuario no tiene ninguna tarea.
            </p>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-5">
                Lista de tareas
              </h1>

              <div className="space-y-4">
                {Tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
                  >
                    <h2 className="text-xl font-semibold text-gray-900">
                      {task.title}
                    </h2>

                    <p className="text-gray-700">{task.description}</p>

                    {/* BADGE DE ESTADO */}
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                        task.is_completed
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {task.is_completed ? "Completado" : "Pendiente"}
                    </span>

                    <p className="text-sm text-gray-500 mt-1">
                      Creado: {new Date(task.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};
