import React from "react";
import { useGroup } from "../../../../hooks";
import { useFormik } from "formik";
import { map } from "lodash";
import * as Yup from "yup";

import {
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

import "./AddEditGroupForm.scss";

export function AddEditGroupForm(props) {
  const { group, sauces, onClose, onRefetch } = props;
  const { addGroup, updateGroup } = useGroup();

  const formik = useFormik({
    initialValues: initialValues(group),
    validationSchema: Yup.object(group ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (group) await updateGroup(group.id, formValue);
      else await addGroup(formValue);
      await onRefetch();
      onClose();
    },
  });

  return (
    <Form className="add-edit-sauce-form" onSubmit={formik.handleSubmit}>
      <InputGroup className="input">
        <InputGroupText>Grupo</InputGroupText>
        <Input
          id="description"
          name="description"
          placeholder="Nombre del grupo"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
        />
      </InputGroup>
      <div className="add-edit-product-form__active">
        <div>
          {map(sauces, (sauce, index) => (
            <div className="cart" key={index}>
              <div>
                <Input
                  type="checkbox"
                  id="chk"
                  value="chk"
                  name="chk"
                  //  checked={formik.values.active}
                  onChange={(group) =>
                    formik.setFieldValue("active", group.target.checked)
                  }
                />
                <label for={sauce.id}>{sauce.description}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button active color="success" block onClick="chk.checked">
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
