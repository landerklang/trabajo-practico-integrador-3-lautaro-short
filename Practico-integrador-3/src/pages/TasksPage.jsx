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
      if (!res) {
        console.log("no se pudo estraer ninguna tarea");
      } else {
        const data = await res.json();
        setTasks(data);
        await new Promise((resolver) => setTimeout(resolver, 1000)),
          setloading(false);
        console.log(data);
      }
    } catch (error) {
      alert("error del servidor", error);
    }
  };

  useEffect(() => {
    FetchTasks();
  }, []);
  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <a href="/CreatedTasks">crear una tarea</a>
          <a href="/PutTasks">editar tareas</a>
          {Tasks?.length === 0 ? (
            <p>El usuario no tiene ninguna tarea hecha </p>
          ) : (
            <div>
              <h1>listar tareas:</h1>
              {Tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title},{task.description}, estado:
                  {task.is_completed ? "completado" : "pendiente"},
                  {task.createdAt}
                </option>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};
