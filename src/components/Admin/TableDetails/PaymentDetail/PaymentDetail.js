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
      <Table striped className="table-category-admin">
        <tbody>
          <tr>
            <td>Mesa</td>
            <td>{payment.table_data.number}</td>
          </tr>
          <tr>
            <td>
              <h4>Total</h4>
            </td>
            <td>
              <h4>$ {formatNumber(payment.totalPayment)}</h4>
            </td>
          </tr>
          <tr>
            <td>Forma de pago:</td>
            <td>{payment.paymentType}</td>
          </tr>
        </tbody>
      </Table>

      <Button block onClick={onCloseTable}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
}
