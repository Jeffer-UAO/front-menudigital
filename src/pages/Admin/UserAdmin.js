import {
  HeaderPage,
  TableUsers,
  AddEditUsersForm,
} from "../../components/Admin";

import React, { useState, useEffect } from "react";
import { useUser } from "../../hooks";
import { Spinner } from "reactstrap";
import { ModalBasic } from "../../components/Common";

export function UserAdmin() {
  const [refetch, setRefetch] = useState(false);
  const { loading, users, getUsers, deleteUser } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    getUsers();
  }, [refetch]);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitelModal("Crear usuario");
    setContentModal(
      <AddEditUsersForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitelModal("Editar usuario");
    setContentModal(
      <AddEditUsersForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`confirmacion exitosa ${data.email}?`);
    if (result) {
      try {
        await deleteUser(data.id);
        onRefetch();
      } catch (error) {
        console.log(error);
      }
      console.log("Usuario actualizado");
    }
  };

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage
          title="Usuarios"
          btnTitle="Nuevo usuario"
          btnClick={addUser}
        />
      </div>
      <div className="spinner containerBody">
        {loading ? (
          <Spinner>Cargando...</Spinner>
        ) : (
          <TableUsers
            users={users}
            updateUser={updateUser}
            onDeleteUser={onDeleteUser}
          />
        )}
      </div>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titelModal}
        children={contentModal}
      />
    </div>
  );
}
