import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import {
  HeaderPage,
  TableSaucesAdmin,
  AddEditSaucesForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useSauces } from "../../hooks";
import { useParams, useHistory } from "react-router-dom";

export function SauceAdmin() {
  const history = useHistory();
  const { loading, getSauces, sauces, deleteSauces } = useSauces();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(null);

  useEffect(() => {
    getSauces();
  }, [refetch]);

  const addSauce = () => {
    setTitleModal("Nueva Salsa");
    setContentModal(
      <AddEditSaucesForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateSauce = (data) => {
    setTitleModal("Actualizar Salsa");
    setContentModal(
      <AddEditSaucesForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        sauce={data}
      />
    );
    openCloseModal();
  };

  const onDeleteSauce = async (data) => {
    const result = window.confirm(`¿ Eliminar ${data.description} ? `);
    if (result) {
      await deleteSauces(data.id);
      onRefetch();
    }
  };

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  return (
    <div className="all-container ">
      <div className="header-page">
        <HeaderPage title="Mis Salsas" btnTitle="Nuevo" btnClick={addSauce} />
      </div>
      <div className="containerBody">
        {loading ? (
          <Spinner>Cargando...</Spinner>
        ) : (
          <>
            <TableSaucesAdmin
              sauces={sauces}
              updateSauce={updateSauce}
              deleteSauce={onDeleteSauce}
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
