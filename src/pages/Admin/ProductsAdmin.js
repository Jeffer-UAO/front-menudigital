import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import {
  HeaderPage,
  TableProductAdmin,
  AddEditProductForm,
  //  AddSaucesToProduct,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useProduct } from "../../hooks";

export function ProductsAdmin() {
  const { loading, addProducts, getProducts, deleteProducts, products } =
    useProduct();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(null);

  useEffect(() => {
    getProducts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = async () => {
    await addProducts();
    //INSERT A PRODUCT ONLY IDPRODUCT
    //SET RESPONSE IN THE LOCALSTORE
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar Producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (data) => {
    const result = window.confirm(`¿ Eliminar producto ${data.title} ? `);
    if (result) {
      await deleteProducts(data.id);
      onRefetch();
    }
  };

  return (
    <div className="all-container ">
      <div className="header-page">
        <HeaderPage
          title="MIS PRODUCTOS"
          btnTitle="Nuevo"
          btnClick={addProduct}
        />
      </div>
      <div className="containerBody">
        {loading ? (
          <Spinner>Cargando...</Spinner>
        ) : (
          <>
            <TableProductAdmin
              products={products}
              updateProduct={updateProduct}
              deleteProduct={onDeleteProduct}
              //    getSaucesAct={getSaucesAct}
            />
          </>
        )}
        <ModalBasic
          show={showModal}
          title={titleModal}
          children={contentModal}
          onClose={openCloseModal}
        />
      </div>
    </div>
  );
}
