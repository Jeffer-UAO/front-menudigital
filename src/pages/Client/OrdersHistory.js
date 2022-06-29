import React, { useEffect, useState } from "react";
import { useOrder, useTable, usePayment } from ".././../hooks";
import { useParams } from "react-router-dom";
import { map, forEach, size } from "lodash";
import { ModalConfirm } from "../../components/Common";

import { OrderHistoryItem } from "../../components/Client";
import { Button } from "reactstrap";

export function OrdersHistory() {
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [idTable, setIdTable] = useState(null);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { tableNumber } = useParams();
  const { getTableByNumber } = useTable();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTable = table[0].id;
      setIdTable(idTable);
      getOrdersByTable(idTable, "", "ordering=-status,-create_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable]);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);
    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment,
      paymentType,
      statusPayment: "PENDIENTE",
    };

    const payment = await createPayment(paymentData);

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  return (
    <div>
      <h1>Historial de pedidos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              block
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta ya esta pedida"
                : "Pedir la cuenta"}
            </Button>
          )}

          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}

      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment("EFECTIVO")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("TARJETA")}
      />
    </div>
  );
}
