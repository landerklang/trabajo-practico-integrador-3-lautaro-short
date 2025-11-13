import { useEffect, useState } from "react";
import { Footer } from "../components/Footer.jsx";

export const HomePage = () => {
  const [home, sethome] = useState(null);
  const [Tasks, setTasks] = useState(null);

  const FetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/profile", {
        credentials: "include",
      });
      if (!res) {
        console.log("error al cargar el nombre de usurio");
      } else {
        const data = await res.json();
        sethome(data.user);
      }
    } catch (error) {
      alert("error del servidor", error);
    }
  };
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
  useEffect(() => {
    FetchProfile(), FetchTasks();
  }, []);

  return (
    <div>
      <h1>BIENVENIDO {home?.name}</h1>
      <h1>Total de tares:{Tasks?.length}</h1>
      <h1>
        Total de tareas completadas:
        {Tasks?.filter((t) => t.is_completed).length}
      </h1>
      <h1>
        Total de tareas incompleta:
        {Tasks?.filter((t) => !t.is_completed).length}
      </h1>
      <Footer />
    </div>
  );
};
