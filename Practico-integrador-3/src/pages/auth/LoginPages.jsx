import { useNavigate } from "react-router-dom";
import { useForm } from "../../hook/useForm.js";

export const LoginPages = () => {
  const navigate = useNavigate();
  const { Form, handleChange, handleSubmit, handleReset } = useForm({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    logged = localStorage.getItem("isLogged", "true");
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event, navigate("/Home"), handleLogin());
      }}
    >
      <div>
        <input
          type="text"
          name="username"
          placeholder="nombre de usuario"
          value={Form.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="contraseña"
          value={Form.password}
          onChange={handleChange}
        />
        <button type="submit" onChange={handleReset}>
          Iniciar sesion
        </button>
      </div>
      <a href="/Register">Registrarte</a>
    </form>
  );
};
