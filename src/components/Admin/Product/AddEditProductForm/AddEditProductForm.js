import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCategory, useProduct } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { map } from "lodash";
import {
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  FormGroup,
  CardImg,
} from "reactstrap";

import "./AddEditProductForm.scss";

export function AddEditProductForm(props) {
  const { addProducts, updateProducts } = useProduct();
  const { product, onClose, onRefetch } = props;
  const { categories, getCategories } = useCategory();
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropdowData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (product) await updateProducts(product.id, formValue);
      else await addProducts(formValue);

      await onRefetch();
      onClose();
    },
  });

  const onDrop = useCallback(async (accepteFile) => {
    const file = accepteFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <InputGroup className="input">
        <InputGroupText>PRODUCTO:</InputGroupText>
        <Input
          id="title"
          name="title"
          placeholder="Nombre del producto"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
      </InputGroup>

      <InputGroup className="input">
        <InputGroupText>PRECIO $:</InputGroupText>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Precio"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
      </InputGroup>

      <FormGroup>
        <InputGroupText className="content-descripcion-product">
          <FormGroup>
            <Label for="exampleText">DESCRIPCIÓN DEL PRODUCTO</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.errors.description}
            />
          </FormGroup>
        </InputGroupText>
      </FormGroup>

      <FormGroup>
        <InputGroupText className="content-select-category">
          CATEGORIA:
          <Select
            placeholder={formik.values.category}
            options={categoriesFormat}
            onChange={(data) => formik.setFieldValue("category", data.value)}
            error={formik.errors.category}
          />
        </InputGroupText>
      </FormGroup>
      <div className="add-edit-product-form__active">
        <Label>
          <Input
            type="checkbox"
            id="active"
            value="active"
            checked={formik.values.active}
            onChange={(data) =>
              formik.setFieldValue("active", data.target.checked)
            }
            error={formik.errors.active}
          />{" "}
          Activar Producto
        </Label>
      </div>

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
    category: data?.category_data.title || "Categorias",
    description: data?.description || "",
    price: data?.price || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
    category: Yup.number().required(true),
    description: Yup.string().required(true),
    price: Yup.number().required(true),
    active: Yup.boolean().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
    category: Yup.string(),
    description: Yup.string().required(true),
    price: Yup.number().required(true),
    active: Yup.boolean().required(true),
  };
}

function formatDropdowData(data) {
  return map(data, (item) => ({
    value: item.id,
    label: item.title,
  }));
}
