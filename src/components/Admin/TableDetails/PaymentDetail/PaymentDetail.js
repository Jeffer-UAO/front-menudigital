import React from "react";
import { usePayment, useOrder } from "../../../../hooks";
import { Table, Button } from "reactstrap";

import "./PaymentDetail.scss";

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const onCloseTable = async () => {
    const result = window.confirm("¿Desea cerrar la mesa?");
    if (result) {
      await closePayment(payment.id);

      for await (const order of orders) {
        await closeOrder(order.id);
      }
      onReloadOrders();
      openCloseModal();
    }
  };

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  return (
    <div className="payment-detail">
      <div striped className="table-category-admin">
        <h5>Mesa No. {payment.table_data.number}</h5>

        <h5>Total: $ {formatNumber(payment.totalPayment)}</h5>

        <p>Forma de pago: {payment.paymentType}</p>
      </div>

      <Button color="success" block onClick={onCloseTable}>
        Pagar y cerrar mesa
      </Button>
    </div>
  );
}
