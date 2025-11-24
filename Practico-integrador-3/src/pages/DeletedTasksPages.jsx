import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const DeletedTasksPages = () => {
  const [SelectTask, SetSelectTask] = useState(null);
  const [Tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const FetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/tasks-by-user", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (event) => {
    const id = event.target.value;

    if (id === "") {
      SetSelectTask(null);
      return;
    }

    const task = Tasks.find((t) => t.id === Number(id));
    SetSelectTask(task);
  };

  const handleDeleted = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:4000/api/tasks/${SelectTask.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!data) return alert("No se encontró la tarea");

      alert("Tarea eliminada con éxito");
      navigate("/Tasks");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Eliminar Tarea
        </h1>

        <form onSubmit={handleDeleted} className="flex flex-col gap-5">
          {/* Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Selecciona la tarea
            </label>

            <select
              onChange={handleSelectChange}
              className="
                w-full p-3 border rounded-lg text-gray-700 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition
              "
            >
              <option value="">Seleccione la tarea a eliminar</option>
              {Tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={!SelectTask}
            className={`
              w-full py-3 rounded-lg font-semibold text-white 
              transition-all
              ${
                SelectTask
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            {SelectTask ? "Eliminar tarea" : "Selecciona una tarea"}
          </button>
        </form>
      </div>
    </main>
  );
};
