import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../../api/user";

import { Input, Label, Button } from "reactstrap";

import { toast } from "react-toastify";
import { useAuth } from "../../../hooks";

import "./LoginForm.scss";

export function LoginForm() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);        
        const { access } = response;
        login(access);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h6 for="username">Usuario</h6>
      <Input
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <h6 for="password">Contraseña</h6>
      <Input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

        <Button block color="primary" type="submit">
          Aceptar
        </Button>
        <a href="/admin"><label>Crear una nueva cuenta</label></a>
        
    
    </form>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string()
      .email("No es un email valido!")
      .required("Este campo es obligatorio!"),
    password: Yup.string().required("Este campo es obligatorio!"),
  };
}
