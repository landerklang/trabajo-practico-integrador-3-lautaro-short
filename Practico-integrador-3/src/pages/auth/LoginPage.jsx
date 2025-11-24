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
      if (!data) {
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
    <main className="min-h-screen flex flex-col justify-between bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center px-4 flex-1">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Iniciar Sesión
            </h1>

            {/* USERNAME */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="username" className="text-gray-700 font-medium">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="nombre de usuario"
                value={Form.username}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-gray-700 font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="aquí coloca tu contraseña"
                value={Form.password}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition font-medium mt-2
            disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Iniciar sesión
            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-gray-600 text-sm">
              ¿No tienes cuenta?
              <a
                href="/Register"
                className="text-blue-600 hover:underline ml-1"
              >
                Registrarte
              </a>
            </p>
          </form>
        </div>
      )}

      <Footer />
    </main>
  );
};
