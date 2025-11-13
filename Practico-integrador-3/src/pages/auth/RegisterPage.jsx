import { useNavigate } from "react-router-dom";
import { useForm } from "../../hook/useForm";
import { useState } from "react";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { Form, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });
  const [loading, setloading] = useState(false);

  const handleRegistre = async (event) => {
    event.preventDefault();
    setloading(true);

    const payload = {
      name: Form.firstname,
      lastname: Form.lastname,
      username: Form.username,
      email: Form.email,
      password: Form.password,
    };
    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!data) {
        return alert(data.message), handleReset();
      }
      await new Promise((resolver) => setTimeout(resolver, 2000)),
        setloading(false);
      localStorage.setItem("isLogged", "true");
      navigate("/Login", { replace: true });
    } catch (error) {
      return alert("error al registrarte"), console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleRegistre}>
          <div>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={Form.username}
              onChange={handleChange}
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Correo eletronico"
              value={Form.email}
              onChange={handleChange}
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={Form.password}
              onChange={handleChange}
              required
            />
            <input
              id="firstname"
              type="text"
              name="firstname"
              placeholder="Primer nombre"
              value={Form.firstname}
              onChange={handleChange}
              required
            />
            <input
              id="lastname"
              type="text"
              name="lastname"
              placeholder="apellido"
              value={Form.lastname}
              onChange={handleChange}
              required
            />
            <input
              id="dni"
              type="text"
              name="dni"
              placeholder="dni"
              value={Form.dni}
              onChange={handleChange}
              required
            />
            <button type="submit">Registrarte</button>
          </div>
          <a href="/Login">¿Ya tenes una cuenta?</a>
        </form>
      )}
      <Footer />
    </main>
  );
};
