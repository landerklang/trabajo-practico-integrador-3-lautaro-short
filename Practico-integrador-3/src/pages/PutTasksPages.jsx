import { useNavigate } from "react-router-dom";
import { useForm } from "../hook/useForm.js";
import { useEffect, useState } from "react";

export const PutTasksPages = () => {
  const { Form, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [Tasks, setTasks] = useState([]);
  const [SelectTask, SetSelectTask] = useState(null);

  const navigate = useNavigate();

  const FetchTasks = async () => {
    try {
      const tasks = await fetch("http://localhost:4000/api/tasks-by-user", {
        credentials: "include",
      });

      if (!tasks) {
        console.log("no se pudo estraer ninguna tarea");
      } else {
        const data = await tasks.json();
        setTasks(data);
      }
    } catch (error) {
      alert("error del servidor", error);
    }
  };

  const handleSelectChange = (event) => {
    const id = event.target.value;

    if (id === "") {
      SetSelectTask(null);
      handleReset();
      return;
    }

    const task = Tasks.find((t) => t.id === Number(id));
    SetSelectTask(task);

    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const res = await fetch(
      `http://localhost:4000/api/tasks/${SelectTask.id}`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(Form),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return alert(data.message), handleReset();
    }

    alert("Tarea actualizada con éxito");
    navigate("/Tasks");
  };

  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Editar Tareas
        </h1>

        {/* SELECTOR */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Seleccionar tarea:
          </label>

          <select
            onChange={handleSelectChange}
            className="w-full p-3 rounded-lg border border-gray-300
            focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
            transition-all duration-200 bg-gray-50"
          >
            <option value="">Seleccionar tarea</option>
            {Tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        {/* FORMULARIO */}
        {SelectTask ? (
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Editando:{" "}
              <span className="text-indigo-600">{SelectTask.title}</span>
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Título */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  value={Form.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  hover:border-indigo-400 transition-all"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  name="description"
                  value={Form.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  hover:border-indigo-400 transition-all"
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_completed"
                  checked={Form.is_completed}
                  onChange={handleChange}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded cursor-pointer
                  focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">
                  ¿Tarea completada?
                </span>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium
                hover:bg-indigo-700 transition-all duration-200 shadow-md"
              >
                Actualizar Tarea
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg font-medium mt-6">
            Selecciona una tarea para editarla
          </p>
        )}
      </div>
    </main>
  );
};
