import React from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks";

import "./AddEditUsersForm.scss";

export function AddEditUsersForm(props) {
  const { onClose, onRefetch, user } = props;
  const { addUser, updateUser } = useUser();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) await updateUser(user.id, formValue);
        else await addUser(formValue);

        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleName">Nombre</Label>
            <Input
              id="exampleName"
              name="first_name"
              placeholder="Nombre"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.errors.first_name}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleLastName">Apellido</Label>
            <Input
              id="exampleLastName"
              name="last_name"
              placeholder="Apellido"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.errors.last_name}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleUserName">Usuario</Label>
            <Input
              id="exampleUserName"
              name="username"
              placeholder="Usuario"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Contraseña</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Correo Electrónico</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Correo elctrónico"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup check>
            <Input
              id="exampleIs_active"
              name="is_active"
              type="checkbox"
              checked={formik.values.is_active}
              onChange={formik.handleChange}
            />
            <Label check for="is_active">
              Activo
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="exampleIs_staff"
              name="is_staff"
              type="checkbox"
              checked={formik.values.is_staff}
              onChange={formik.handleChange}
            />
            <Label check for="2exampleCheck">
              Superusuario
            </Label>
          </FormGroup>
        </Col>
      </Row>

      <div>
        <Button type="submit" active color="success" block>
          {user ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </Form>
  );
}

function initialValues(data) {
  return {
    username: data?.username || "",
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    password: "",
    is_active: data?.is_active ? true : false,
    is_staff: data?.is_staff ? true : false,
  };
}

function newSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}

function updateSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}
