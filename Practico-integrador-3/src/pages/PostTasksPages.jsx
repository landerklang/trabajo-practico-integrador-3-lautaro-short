import { useNavigate } from "react-router-dom";
import { useForm } from "../hook/useForm.js";
import { Footer } from "../components/Footer.jsx";

export const PostTasksPages = () => {
  const { Form, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const navigate = useNavigate();

  const handlePostTasks = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/tasks", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(Form),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!data) return alert(data.message), handleReset();

      alert("Tarea creada con éxito");
      navigate("/Tasks");
    } catch (error) {
      alert("Error al crear la tarea");
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handlePostTasks}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Crear Nueva Tarea
        </h1>

        {/* Campo título */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Título de la tarea
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Escribe un título"
            value={Form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       hover:border-blue-400 transition"
          />
        </div>

        {/* Campo descripción */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Descripción
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Describe la tarea"
            value={Form.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       hover:border-blue-400 transition"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            id="is_completed"
            type="checkbox"
            name="is_completed"
            checked={Form.is_completed}
            onChange={(e) =>
              handleChange({
                target: { name: "is_completed", value: e.target.checked },
              })
            }
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
          <label htmlFor="is_completed" className="text-gray-700 font-medium">
            ¿La tarea ya está completada?
          </label>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium
                     hover:bg-blue-700 active:bg-blue-800 transition shadow-md"
        >
          Crear Tarea
        </button>
      </form>
    </main>
  );
};
