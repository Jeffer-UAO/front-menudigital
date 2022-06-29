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
      <Label for="username">Usuario</Label>
      <Input
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Label for="password">Contraseña</Label>
      <Input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div>
        <Button color="primary" type="submit">
          Aceptar
        </Button>
      </div>
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
