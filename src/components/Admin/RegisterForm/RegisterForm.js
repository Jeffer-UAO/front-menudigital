import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
//import { loginClientApi } from "../../../../api/userClient";

import { Input, Label, Button } from "reactstrap";

import { toast } from "react-toastify";
import "./RegisterForm.scss";


export function RegisterForm() {
  const history = useHistory();
  // const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formValue) => {
      try {
       // const response = await loginClientApi(formValue);
        history.push(`/`);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="closed" onClick={() => history.push(`/`)}>
        <label>Salir</label>
      </div>
      <div className="RegisterForm">
        <div className="register-content">
          <h4>Registrar Empresa</h4>

          <div className="input">
            <Label for="title">Nombre Empresa</Label>
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
            />
          </div>

          <div className="input">
            <Label for="title">Correo</Label>
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
            />
          </div>
          <div className="input">
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
          </div>

          <Button block color="danger" type="submit">
            Guardar
          </Button>

          <div className="remember" onClick={() => history.push(`/login`)}>
            <label>Ya tengo una empresa registrada</label>
          </div>
        </div>
      </div>
    </form>
  );
}

function initialValues() {
  return {
    title: "",
    password: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string()
      .email("No es un email valido!")
      .required("Este campo es obligatorio!"),
    password: Yup.string().required("Este campo es obligatorio!"),
  };
}
