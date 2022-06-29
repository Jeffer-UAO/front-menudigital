import React from "react";
import { useSauces } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

import "./AddEditSaucesForm.scss";

export function AddEditSaucesForm(props) {
  const { sauce, onClose, onRefetch } = props;
  const { addSauces, updateSauces } = useSauces();

  const formik = useFormik({
    initialValues: initialValues(sauce),
    validationSchema: Yup.object(sauce ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (sauce) await updateSauces(sauce.id, formValue);
      else await addSauces(formValue);

      await onRefetch();
      onClose();
    },
  });
  return (
    <Form className="add-edit-sauce-form" onSubmit={formik.handleSubmit}>
      <InputGroup className="input">
        <InputGroupText>Salsa:</InputGroupText>
        <Input
          id="description"
          name="description"
          placeholder="Nombre de la salsa"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
        />
      </InputGroup>
      <div className="add-edit-product-form__active">
        <Label>
          <Input
            type="checkbox"
            id="active"
            value="active"
            checked={formik.values.active}
            onChange={(sauce) =>
              formik.setFieldValue("active", sauce.target.checked)
            }
            error={formik.errors.active}
          />{" "}
          Activar Salsa
        </Label>
      </div>

      <Button type="submit" active color="success" block>
        Guardar
      </Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    description: data?.description || "",
    active: data?.active ? true : false,
  };
}

function newSchema() {
  return {
    description: Yup.string().required(true),
    active: Yup.boolean().required(true),
  };
}

function updateSchema() {
  return {
    description: Yup.string().required(true),
    active: Yup.boolean().required(true),
  };
}
