import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "./ModalBasic.scss";

export function ModalBasic(props) {
  const { show, size, title, children, onClose } = props;
  return (
    <div>     
      <Modal
        toggle={onClose}
        keyboard={true}
        isOpen={show}
        size={size}
        className="modal-basic"
      >
        {title && <ModalHeader toggle={onClose}>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  );
}
