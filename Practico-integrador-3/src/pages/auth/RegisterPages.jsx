import { useNavigate } from "react-router";
import { useForm } from "../../hook/useForm";

export const RegisterPages = () => {
  const navigate = useNavigate();
  const { Form, handleChange, handleSubmit, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
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
          placeholder="Nombre de usuario"
          value={Form.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Correo eletronico"
          value={Form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Contraseña"
          value={Form.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="Primer nombre"
          value={Form.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="apellido"
          value={Form.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dni"
          placeholder="dni"
          value={Form.dni}
          onChange={handleChange}
        />
        <button type="submit" onChange={handleReset}>
          Registrarte
        </button>
      </div>
      <a href="/Login">¿Ya tenes una cuenta?</a>
    </form>
  );
};
