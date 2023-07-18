import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import {
  HeaderPage,
  TableGroupAdmin,
  AddEditGroupForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useGroup, useSauces } from "../../hooks";

export function GroupAdmin() {
  const { loading, getGroup, groups, deleteGroup } = useGroup();
  const { sauces, getSauces } = useSauces();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(null);

  useEffect(() => {
    getGroup();
  }, [refetch]);

  useEffect(() => {
    getSauces();
  }, [refetch]);

  const addGroup = () => {
    setTitleModal("Nuevo Grupo");
    setContentModal(
      <AddEditGroupForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateGroup = (data) => {
    setTitleModal("Actualizar Grupo");
    setContentModal(
      <AddEditGroupForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        sauces={sauces}
        group={data}
      />
    );
    openCloseModal();
  };

  const onDeleteGroup = async (data) => {
    const result = window.confirm(`¿ Eliminar ${data.description} ? `);
    if (result) {
      await deleteGroup(data.id);
      onRefetch();
    }
  };

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  return (
    <div className="all-container ">
      <div className="header-page">
        <HeaderPage title="Grupos" btnTitle="Nuevo" btnClick={addGroup} />
      </div>
      <div className="containerBody">
        {loading ? (
          <Spinner>Cargando...</Spinner>
        ) : (
          <>
            <TableGroupAdmin
              groups={groups}
              updateGroup={updateGroup}
              deleteGroup={onDeleteGroup}
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
