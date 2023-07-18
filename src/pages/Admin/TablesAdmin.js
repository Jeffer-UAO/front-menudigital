import React, { useState, useEffect } from "react";
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from "../../components/Admin";
import { useTable } from "../../hooks";
import { Spinner } from "reactstrap";
import { ModalBasic } from "../../components/Common";

export function TablesAdmin() {
  const [refetch, setRefetch] = useState(false);
  const { loading, tables, getTables, deleteTable } = useTable();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    getTables();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addTable = () => {
    setTitleModal("Crear Mesa o Tipo");
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateTable = (data) => {
    setTitleModal("Actualizar mesa");
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        table={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTable = async (data) => {
    const result = window.confirm(`Eliminar ${data.number}`);
    if (result) {
      await deleteTable(data.id);
      onRefetch();
    }
  };

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage
          title="Mesas"
          btnTitle="Nueva Mesa o Tipo"
          btnClick={addTable}
        />
      </div>
      <div className="containerBody">
        <div className="spinner">
          {loading ? (
            <Spinner>Cargando...</Spinner>
          ) : (
            <TableTablesAdmin
              tables={tables}
              updateTable={updateTable}
              onDeleteTable={onDeleteTable}
            />
          )}
        </div>
        <ModalBasic
          show={showModal}
          title={titleModal}
          children={contentModal}
          onClose={openCloseModal}
          size="sm"
        />
      </div>
    </div>
  );
}
