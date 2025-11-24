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
    <main className="min-h-screen flex flex-col justify-between bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <form
            onSubmit={handleRegistre}
            className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Crear cuenta
            </h1>

            <div className="grid grid-cols-1 gap-3">
              {/* USERNAME */}
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={Form.username}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* EMAIL */}
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={Form.email}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* PASSWORD */}
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={Form.password}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* FIRST NAME */}
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Primer nombre"
                value={Form.firstname}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* LAST NAME */}
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Apellido"
                value={Form.lastname}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 transition"
              />

              {/* DNI */}
              <input
                id="dni"
                type="text"
                name="dni"
                placeholder="DNI"
                value={Form.dni}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition font-medium mt-3
            disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Registrarte
            </button>

            {/* GO TO LOGIN */}
            <p className="text-center text-gray-600 text-sm">
              ¿Ya tenés una cuenta?
              <a href="/Login" className="text-blue-600 hover:underline ml-1">
                Iniciar sesión
              </a>
            </p>
          </form>
        </div>
      )}

      <Footer />
    </main>
  );
};
