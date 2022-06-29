import React, { useState } from "react";
import { map } from "lodash";
import QRCode from "qrcode.react";
import { ImQrcode } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { ModalBasic } from "../../../Common";

import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import "./TableTablesAdmin.scss";

export function TableTablesAdmin(props) {
  const { tables, updateTable, onDeleteTable } = props;
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
        <main className="table_list" key={index}>
          <article>
            <p>{table.number}</p>
            <IcTable />

            <>
              <Action
                table={table}
                updateTable={updateTable}
                onDeleteTable={onDeleteTable}
                showQr={showQr}
              />
            </>
          </article>
        </main>
      ))}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Codigo QR"
        size=""
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
        <ImQrcode />
      </label>
      <label onClick={() => updateTable(table)}>
        <AiOutlineEdit />
      </label>
      <label onClick={() => onDeleteTable(table)}>
        <MdDeleteForever />
      </label>
    </div>
  );
}
