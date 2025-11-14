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
    // console.log(id);
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
        headers: { "Content-Type": "" },
      }
    );
  };

  useEffect(() => {
    FetchTasks();
  }, []);
  return (
    <div>
      <a href="/CreatedTasks">crear una tarea</a>
      <select onChange={handleSelectChange}>
        <option value="">Seleccionar tarea</option>
        {Tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
      {/* <a href="/PutTasks">editar una tarea</a> */}
    </div>
  );
};
