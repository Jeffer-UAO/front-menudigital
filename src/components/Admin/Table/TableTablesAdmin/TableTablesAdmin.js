import React, { useState } from "react";
import { map } from "lodash";
import QRCode from "qrcode.react";

import { ImQrcode } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";

import { ReactComponent as IcTable } from "../../../../assets/table.svg";

import { ModalBasic } from "../../../Common";

import "./TableTablesAdmin.scss";
import { Button } from "reactstrap";

export function TableTablesAdmin(props) {
  const { tables, updateTable, onDeleteTable, addTable } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showQr = (table) => {
    const url = `${window.location.origin}/client/${table.number}`;
    setContentModal(
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} />
      </div>
    );
    openCloseModal();
  };

  return (
    <div className="table-table-admin">
      {map(tables, (table, index) => (
        <div className="table_list" key={index}>
          <div className="article">
            <div className="table">
              <IcTable />
              <h6>{table.number}</h6>
            </div>
            <Action
              table={table}
              updateTable={updateTable}
              onDeleteTable={onDeleteTable}
              showQr={showQr}
            />
          </div>
        </div>
      ))}

      <Button className="more" onClick={addTable}>
        <BsPlusCircle size={35} color="white" />
      </Button>

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Codigo QR"
        size="sm"
        children={contentModal}
      />
    </div>
  );
}

function Action(props) {
  const { table, updateTable, onDeleteTable, showQr } = props;
  return (
    <div className="btn-action">
      <label onClick={() => showQr(table)}>
        <ImQrcode size={22} color="white" />
      </label>
      <label onClick={() => updateTable(table)}>
        <AiOutlineEdit size={22} color="white" />
      </label>
      <label onClick={() => onDeleteTable(table)}>
        <MdDeleteForever size={22} color="white" />
      </label>
    </div>
  );
}
