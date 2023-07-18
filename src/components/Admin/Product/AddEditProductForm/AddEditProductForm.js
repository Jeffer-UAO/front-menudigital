import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCategory, useProduct, useSauces } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { map } from "lodash";
import {
  Spinner,
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  FormGroup,
  CardImg,
} from "reactstrap";
import { SauceToProduct } from "../../Sauce";
import { ModalBasic } from "../../../Common/ModalBasic";

import "./AddEditProductForm.scss";

export function AddEditProductForm(props) {
  const { product, onClose, onRefetch } = props;

  const [showModal, setShowModal] = useState(false);
  const { loadingII, addProducts, updateProducts } = useProduct();
  const [saucesCreateToProduct, setSaucesCreateToProduct] = useState(null);
  const {
    getSaucesActive,
    sauces,
    saucesMini,
    getSaucesToProductId,
    addSaucesToProduct,
    deleteSaucesToProduct,
  } = useSauces();
  const { categories, getCategories } = useCategory();
  const [saucesOldId, setSaucesOldId] = useState("mini");
  const [saucesIndex, setSaucesIndex] = useState(null);

  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(
    product ? product?.id : 0
  );
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );

  useEffect(() => {
    if (previewProduct > 0) {
      getSaucesToProductId(previewProduct);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getSaucesActive();
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropdowData(categories));
  }, [categories]);

  const sauceOption = () => {
    let arrayIds = [];
    let arrayIndex = [];
    if (saucesMini) {

      for (let i = 0; i < saucesMini.length; i++) {
        arrayIds.push(saucesMini[i]);
        arrayIndex.push(saucesMini[i].sauces);
      }
    } else if (saucesCreateToProduct) {
      for (let i = 0; i < saucesCreateToProduct.length; i++) {
        arrayIds.push(saucesCreateToProduct[i]);
      }
    }
    setSaucesOldId(arrayIds);
    setSaucesIndex(arrayIndex);

    openCloseModal();
  };

  const createSaucesToProduct = (sauces) => {
    setSaucesCreateToProduct(sauces);
    openCloseModal();
  };

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (product) await updateProducts(product.id, formValue);
      else await addProductWhitSauces(formValue);
      await onRefetch();
      onClose();
    },
  });

  const addProductWhitSauces = async (formValue) => {
    const result = await addProducts(formValue);
    if (saucesCreateToProduct) {
      for (var i = 0; i < saucesCreateToProduct.length; i++) {
        addSaucesToProduct(
          result.id,
          saucesCreateToProduct[i].id,
          saucesCreateToProduct[i].description
        );
      }
    }
  };

  const openCloseModal = () => setShowModal((prev) => !prev);

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
    <>
      <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
        <div className="new-product">
          <header className="o-header"></header>
          <aside className="o-aside">
            <CardImg src={previewImage} />

            <Button
              className="input"
              block
              type="button"
              {...getRootProps()}
              color={formik.errors.image && "danger"}
            >
              {previewImage ? "Cambiar imagen" : "Subir imagen"}
            </Button>
            <input {...getInputProps()} />
          </aside>
          <main className="o-main">
            <Label>
              Activar Producto{" "}
              <Input
                type="checkbox"
                id="active"
                value="active"
                checked={formik.values.active}
                onChange={(data) =>
                  formik.setFieldValue("active", data.target.checked)
                }
                error={formik.errors.active}
              />
            </Label>
            <Input
              className="input"
              id="title"
              name="title"
              placeholder="Nombre del producto"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
            />

            <Input
              className="input"
              id="price"
              name="price"
              type="number"
              placeholder="Precio"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.errors.price}
            />

            <Select
              className="input"
              placeholder={formik.values.category}
              options={categoriesFormat}
              onChange={(data) => formik.setFieldValue("category", data.value)}
              error={formik.errors.category}
            />

            <Button
              className="input"
              block
              type="button"
              onClick={() => sauceOption()}
            >
              Salsas
            </Button>
          </main>
          <footer className="o-footer">
            <Input
              className="input"
              id="description"
              name="description"
              type="textarea"
              placeholder="Descripción del producto"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.errors.description}
            />

            {loadingII ? (
              <Button disabled block>
                <Spinner>Cargando...</Spinner>
              </Button>
            ) : (
              <Button type="submit" color="success" block>
                GRABAR
              </Button>
            )}
          </footer>
        </div>
      </Form>

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={formik.values.title}
        size="lg"
      >
        <SauceToProduct
          sauces={sauces}
          saucesOldId={saucesOldId}
          saucesIndex={saucesIndex}
          idProduct={previewProduct}
          deleteSaucesToProduct={deleteSaucesToProduct}
          addSaucesToProduct={addSaucesToProduct}
          createSaucesToProduct={createSaucesToProduct}
          saucesMini={saucesMini}
          openCloseModal={openCloseModal}

          //  onReloadOrders={onReloadOrders}
        />
      </ModalBasic>
    </>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    category: data?.category || "Categorias",
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
    description: Yup.string(),
    price: Yup.number().required(true),
    active: Yup.boolean().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
    category: Yup.string(),
    description: Yup.string(),
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
