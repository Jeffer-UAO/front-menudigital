import React from "react";
import { useFormik } from "formik";
import { useTable } from "../../../../hooks";
import * as Yup from "yup";
import { Form, Button, Input } from "reactstrap";
import "./AddEditTableForm.scss";

export function AddEditTableForm(props) {
  const { addTable, updateTable, onDeleteTable } = useTable();
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
      <Input
        id="number"
        name="number"
        type="number"
        placeholder="Numero de la mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />

      <Button type="submit" active color="success" block>
        Guardar
      </Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
  };
}
