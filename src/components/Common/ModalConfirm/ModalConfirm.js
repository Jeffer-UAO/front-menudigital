import React from "react";

import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import "./ModalConfirm.scss";

export function ModalConfirm(props) {
  const { title, show, onClose, onCloseText, onConfirm, onConfirmText, size } =
    props;

  return (
    <Modal
      toggle={onClose}
      keyboard={true}
      isOpen={show}
      size={size}
      className="modal-confirm"
    >
      {title && <ModalHeader toggle={onClose}>{title}</ModalHeader>}

      <ModalBody>
        <Button onClick={onClose}>{onCloseText || "Cancelar"}</Button>
        <Button onClick={onConfirm}>{onConfirmText || "Aceptar"}</Button>
      </ModalBody>
    </Modal>
  );
}
