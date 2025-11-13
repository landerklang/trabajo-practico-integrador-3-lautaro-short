import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loading } from "../components/Loading";

export const ProfilePage = () => {
  const [Profile, setProfile] = useState(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const handleProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/profile", {
        credentials: "include",
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
        await new Promise((resolver) => setTimeout(resolver, 2000)),
          setloading(true);
      } else {
        console.log("error al encontrar el usuario");
      }
    } catch (error) {
      alert("errore del servidor", error);
    }
  };
  useEffect(() => {
    handleProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isLogged"), navigate("/Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <>
          <h1>informacion del usuario</h1>
          <h1>id:{Profile?.id}</h1>
          <h1>Nombre:{Profile?.name}</h1>
          <h1>Apellido:{Profile?.lastname}</h1>
          <Link onClick={handleLogout}>cerrar sesio</Link>
        </>
      )}
    </>
  );
};
