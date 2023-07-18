import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useCategory } from "../../hooks";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(null);

  const { loading, categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Editar Categoria");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (data) => {
    const result = window.confirm(
      `¿Desea eliminar la categoria: ${data.title}?`
    );
    if (result) {
      await deleteCategory(data.id);
      onRefetch();
    }
  };

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage
          title="Categorías"
          btnTitle="Nueva Categoría"
          btnClick={addCategory}
        />
      </div>
      {loading ? (
        <Spinner>Cargando...</Spinner>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
       size="sm"
      />
    </div>
  );
}
