import React, { useState } from "react";
import { PaymentProductsList } from "../../../Admin";
import { map } from "lodash";
import moment from "moment";
import { ModalBasic } from "../../../Common";

import "./TablePayments.scss";

export function TablePayments(props) {
  const { payments } = props;
  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showDetails = (payment) => {
    setTitleModal(`Detalle Mesa No. ${payment.table_data?.number}`);
    setContentModal(<PaymentProductsList payment={payment} />);
    setShowModal(true);
  };

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  return (
    <div className="table-payment-admin containerBody">
      {map(payments, (payment, index) => (
        <div
          className="table-payment-admin__cart"
          onClick={() => showDetails(payment)}
          key={index}
        >
          <ol>
            <li>
              <p>Pedido:</p>
              <span>{payment.id}</span>
            </li>
            <li>
              <p>Mesa:</p>
              <span>{payment.table_data?.number}</span>
            </li>
            <li>
              <p>Total:</p>
              <span> $ {formatNumber(payment.totalPayment)}</span>
            </li>
            <li>
              <p>T.Pago: </p>
              <span>{payment.paymentType}</span>
            </li>
            <li>
              <p>Fecha:</p>
              <span>
                {moment(payment.created_at).format("DD/MM/YYYY - HH:MM")}
              </span>
            </li>
          </ol>
        </div>
      ))}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titelModal}
        children={contentModal}
        size="sm"
      />
    </div>
  );
}
