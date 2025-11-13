import { useState } from "react";

export const useForm = (inicialValue) => {
  const [Form, setForm] = useState(inicialValue);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // console.log(value);
    setForm({ ...Form, [name]: type === "checkbox" ? checked : value });
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
