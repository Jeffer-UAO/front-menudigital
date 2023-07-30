import React, { useState } from "react";
import { useFormik } from "formik";
import { useTable } from "../../../../hooks";
import * as Yup from "yup";
import { Form, Button, Input } from "reactstrap";
import Select from "react-select";

import "./AddEditTableForm.scss";

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props;
  const { addTable, updateTable } = useTable();
  const [searchStr, setSearchStr] = useState("");

  const options = [
    { value: "MS", label: "MESA" },
    { value: "DM", label: "DOMICILIO" },
    { value: "LL", label: "LLEVAR" },
  ];

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (searchStr === "MS") {
        if (table) await updateTable(table.id, formValue);
        else await addTable(formValue);
      } else if (searchStr === "DM") {
        await addTable(formValue);
      } else if (searchStr === "LL") {
        await addTable(formValue);
      } else {
        console.log("Opcion no Valida");
      }

      await onRefetch();
      onClose();
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Select
        options={options}
        isSearchable={false}
        onChange={(e) => setSearchStr(e.value)}
      />

      {searchStr === "MS" && (
        <>
          <Input
            className="controlName"
            id="name"
            name="name"
            type="text"
            value={formik.values.mesa}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />

          <Input
            className="control"
            id="number"
            name="number"
            type="number"
            placeholder="Numero de la mesa"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.errors.number}
          />
        </>
      )}

      <Button className="control" type="submit" active color="success" block>
        Guardar
      </Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
    name: data?.name || "Mesa",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
    name: Yup.string(),
  };
}
