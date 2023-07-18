import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import {
  HeaderPage,
  TableSalesmanAdmin,
  AddEditSalesmanForm,
} from "../../components/Admin";

import { ModalBasic } from "../../components/Common";
import { useSalesman } from "../../hooks";


export function SalesmanAdmin() {
  const { loading, getSalesman, salesman, deleteSalesman } = useSalesman();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(null);

  useEffect(() => {
    getSalesman();
  }, [refetch]);

  const addSalesman = () => {
    setTitleModal("Nuevo vendedor");
    setContentModal(
      <AddEditSalesmanForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };


  const updateSalesman = (data) => {
    setTitleModal("Actualizar Vendedor");
    setContentModal(
      <AddEditSalesmanForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        salesman={data}
      />
    );
    openCloseModal();
  };

  const onDeleteSauce = async (data) => {
    const result = window.confirm(`¿ Eliminar ${data.description} ? `);
    if (result) {
      await deleteSalesman(data.id);
      onRefetch();
    }
  };

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  return (
    <div className="all-container ">
      <div className="header-page">
        <HeaderPage
          title="Vendedor"
          btnTitle="Nuevo"
          btnClick={addSalesman}  
        />
      </div>
      <div className="containerBody">
        {loading ? (
          <Spinner>Cargando...</Spinner>
        ) : (
          <>
            <TableSalesmanAdmin
              salesman={salesman}
              updateSalesman={updateSalesman}
              deleteSalesman={onDeleteSauce}
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
