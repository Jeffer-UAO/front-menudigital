import React from "react";
import { useFormik } from "formik";
import { useTable } from "../../../../hooks";
import * as Yup from "yup";
import { Form, Button, Input } from "reactstrap";
import "./AddEditTableForm.scss";

export function AddEditTableForm(props) {
  const { addTable, updateTable} = useTable();
  const { onClose, onRefetch, table } = props;

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (table) await updateTable(table.id, formValue);
      else await addTable(formValue);

      await onRefetch();
      onClose();
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Input className="control"
        id="name"
        name="name"
        type="text"
        placeholder="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />

      <Input className="control"
        id="number"
        name="number"
        type="number"
        placeholder="Numero de la mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />

      <Button className="control" type="submit" active color="success" block>
        Guardar
      </Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
    name: data?.name || "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
    name: Yup.string(),
  };
}
