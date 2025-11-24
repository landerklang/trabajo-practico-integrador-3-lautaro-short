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
        console.log(data);
      }
    } catch (error) {
      alert("error del servidor", error);
    }
  };

  const handleSelectChange = (event) => {
    const id = event.target.value;

    if (id === "") {
      // opción “ninguna tarea”
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
    if (!res) {
      return alert(data.message), handleReset();
    }
    alert("tareas actualizadas");
    navigate("/Tasks");
  };

  useEffect(() => {
    FetchTasks();
  }, []);
  return (
    <>
      <select onChange={handleSelectChange}>
        <option value="">Seleccionar tarea</option>
        {Tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
      <>
        {SelectTask ? (
          <div>
            <h2>editar tarea</h2>

            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                placeholder="titulo de la tarea"
                value={Form.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="descripcion de la tarea"
                value={Form.description}
                onChange={handleChange}
              />
              <input
                type="checkbox"
                name="is_completed"
                checked={Form.is_completed}
                onChange={handleChange}
              />
              esta completo?
              <button type="submit">{SelectTask ? "Actualizar" : ""}</button>
            </form>
          </div>
        ) : (
          <h1>seleccione una tarea para poder editarla</h1>
        )}
      </>
    </>
  );
};
