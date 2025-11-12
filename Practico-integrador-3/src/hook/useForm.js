import { useState } from "react";

export const useForm = (inicialValue) => {
  const [Form, setForm] = useState(inicialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...Form, [name]: value });
  };
  const handleReset = () => {
    setForm(inicialValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleReset();
    console.log(Form);
  };
  return { Form, setForm, handleChange, handleSubmit, handleReset };
};
