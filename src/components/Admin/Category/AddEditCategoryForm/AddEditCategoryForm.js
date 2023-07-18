import React, { useState, useCallback } from "react";
import { useCategory } from "../../../../hooks";
import { Form, CardImg, Button, Input } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch, category } = props;
  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const { addCategory, updateCategory } = useCategory();
  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        else await addCategory(formValue);
        onRefetch();
        onClose();
      } catch (error) {
        console.log(`AddEditCategoryFor ${error}`);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/npg, image/jfif",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Input
        id="title"
        name="title"
        placeholder="Nombre de la categoria"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
       <CardImg src={previewImage} />
      <Button
        type="button"
        block
        {...getRootProps()}
        color={formik.errors.image && "danger"}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
     
      <Button type="submit" active color="success" block>
        Guardar
      </Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
