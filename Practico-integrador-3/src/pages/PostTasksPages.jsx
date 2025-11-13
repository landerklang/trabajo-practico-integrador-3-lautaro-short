import { useNavigate } from "react-router-dom";
import { useForm } from "../hook/useForm.js";

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
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (!data) {
        return alert(data.message), handleReset();
      }
      await new Promise((resolver) => setTimeout(resolver, 2000)),
        navigate("/Tasks");
    } catch (error) {
      return alert("error al crear una tarea", console.log(error));
    }
  };
  console.log(Form.is_completed);
  return (
    <>
      <form onSubmit={handlePostTasks}>
        <div>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="nombre de la tarea"
            value={Form.title}
            onChange={handleChange}
            required
          />
          <input
            id="description"
            type="text"
            name="description"
            placeholder="ingrese la descripcion de la tarea"
            value={Form.description}
            onChange={handleChange}
            required
          />
          <input
            id="is_completed"
            type="checkbox"
            name="is_completed"
            checked={Form.is_completed}
            onChange={handleChange}
          />
          se realizo esta tarea
        </div>
        <button type="submit">Crear la tarea</button>
      </form>
    </>
  );
};
