import { useNavigate } from "react-router-dom";
import { useForm } from "../../hook/useForm.js";
import { Loading } from "../../components/Loading.jsx";
import { useState } from "react";
import { Footer } from "../../components/Footer.jsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { Form, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });
  const [loading, setloading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setloading(true);
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify(Form),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.ok) {
        return alert(data.message), handleReset();
      }
      await new Promise((resolver) => setTimeout(resolver, 2000)),
        setloading(false);
      localStorage.setItem("isLogged", "true"), navigate("/Home");
    } catch (error) {
      return (
        alert("error al iniciar sesion"), console.log(error), handleReset()
      );
    }
  };
  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="nombre de usuario"
              value={Form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="aqui coloca tu contraseña"
              value={Form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Iniciar sesion</button>
          </div>
          <a href="/Register">Registrarte</a>
        </form>
      )}
      <Footer />
    </main>
  );
};
