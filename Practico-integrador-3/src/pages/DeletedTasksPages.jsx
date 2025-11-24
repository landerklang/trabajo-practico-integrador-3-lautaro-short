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
      if (!res) {
        console.log("no se pudo extraer las tareas");
      } else {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {}
  };
  const handleSelectChange = (event) => {
    const id = event.target.value;
    if (id === "") {
      SetSelectTask(null);
      return;
    }
    const tasks = Tasks.find((t) => t.id === Number(id));
    SetSelectTask(tasks);
  };

  const handleDeleted = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/tasks/${SelectTask.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data) {
        return alert("no se encontro la tarea");
      }
      alert("tarea eliminada");
      navigate("/Tasks");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <>
      <form onSubmit={handleDeleted}>
        <select onChange={handleSelectChange}>
          <option value="">seleccione la tarea a eliminar</option>
          {Tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
        <button type="submit">
          {SelectTask ? "eliminar" : "no selecciono la tarea"}
        </button>
      </form>
    </>
  );
};
