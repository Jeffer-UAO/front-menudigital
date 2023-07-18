import React, { useEffect, useState } from "react";
import { useOrder, useTable, usePayment } from ".././../hooks";
import { useParams } from "react-router-dom";
import { map, forEach, size } from "lodash";
import { ModalConfirm } from "../../components/Common";

import { OrderHistoryItem } from "../../components/Client";

import { getUserLocal } from "../../api/userClient";

import { Button, Table } from "reactstrap";

export function OrdersHistory() {
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [idTable, setIdTable] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { tableNumber } = useParams();
  const { getTableByNumber } = useTable();
  const { loading, orders, addPaymentToOrder, getOrdersByUser } = useOrder();
  const [total, setTotal] = useState(0);

  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const userCar = await getUserLocal();
      const table = await getTableByNumber(tableNumber);
      const idTable = table[0].id;
      const userId = userCar.id;
      setIdUser(userId);
      setIdTable(idTable);
      //   getOrdersByTable(idTable, "", "ordering=-status,-create_at");
      //---------------------------------

      getOrdersByUser("", idTable, userId, "", "ordering=-status,-create_at");
    })();
  }, [idTable, idUser]);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable]);

  useEffect(() => {
    let totalTemp = 0;
    forEach(orders, (order) => {
      totalTemp += Number(order.price * order.qty);
    });

    setTotal(totalTemp);
  }, [orders]);

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

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  console.log(orders);
  return (
    <div>
      <h1>Historial de pedidos </h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="content-order-history">
            <Table striped>
              <thead>
                <label>PEDIDO No. Usuario: {idUser}</label>

                <tr>
                  <th>PRODUCTO</th>
                  <th>CANT</th>
                  <th>PRECIO</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {map(orders, (order) => (
                  <tr>
                    <td>{order.product_data.title}</td>
                    <td>{order.qty}</td>
                    <td>{formatNumber(order.product_data.price)}</td>
                    <td>
                      {formatNumber(order.qty * order.product_data.price)}
                    </td>
                  </tr>
                  //   <OrderHistoryItem key={order.id} order={order} />
                ))}
              </tbody>
              <tfooter>
                <th>Total $ </th>

                <th>{formatNumber(total)}</th>
              </tfooter>
            </Table>
          </div>
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

{
  /**
         * <>
         *  <div className="content-order-history">
            {map(orders, (order) => (
              <OrderHistoryItem key={order.id} order={order} />
            ))}
          </div>

          {size(orders) > 0 && (
            <Button
            color="success"
            active
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
        </>
         * 
         */
}
