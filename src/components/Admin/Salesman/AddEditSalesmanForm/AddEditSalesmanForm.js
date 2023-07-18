import React from "react";
import { useSalesman} from "../../../../hooks";
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

import "./AddEditSalesmanForm.scss";

export function AddEditSalesmanForm(props) {
  const { salesman, onClose, onRefetch } = props;
  const { addSalesman, updateSalesman } = useSalesman();

  const formik = useFormik({
    initialValues: initialValues(salesman),
    validationSchema: Yup.object(salesman ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (salesman) await updateSalesman(salesman.id, formValue);
      else await addSalesman(formValue);

      await onRefetch();
      onClose();
    },
  });
  return (
    <Form className="add-edit-sauce-form" onSubmit={formik.handleSubmit}>
      <InputGroup className="input">
        <InputGroupText>Nombe:</InputGroupText>
        <Input
          id="description"
          name="description"
          placeholder="Nombre vendedor"
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
            onChange={(salesman) =>
              formik.setFieldValue("active", salesman.target.checked)
            }
            error={formik.errors.active}
          />{" "}
          Activar
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
