import React, { useState, useEffect } from "react";
import { size } from "lodash";
import classNames from "classnames";
import { getOrderByTableApi } from "../../../../api/order";
import { addTableCart } from "../../../../api/cart";
import { ORDER_STATUS } from "../../../../utils/constants";
import { usePayment } from "../../../../hooks";
import { useHistory } from "react-router-dom";

import { GiRoundTable } from "react-icons/gi";

import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table, reload } = props;

  const history = useHistory();
  const { getPaymentByTable } = usePayment();
  const [orders, setOrders] = useState([]);

  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getOrderByTableApi(
        table.id,
        ORDER_STATUS.PENDIENTE
      );
      setOrders(response);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrderByTableApi(
        table.id,
        ORDER_STATUS.ENTREGADO
      );

      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
  }, [reload]);

  const e = () => {
    addTableCart(table.id);
    history.push(`/admin/table/detail`);
  };

  return (
    <main className="table_admin" onClick={e}>
      <article
        className={classNames({
          table_admin_pending: size(orders) > 0,
          table_admin_free: size(orders) <= 0,
          table_admin_delivery: tableBusy,
        })}
      >
        <div className="orders-pending head">
          {table.name ? <label>{table.name}</label> 
          :
          <p>MESA</p>} <h6>{table.number}</h6>
        </div>

        {pendingPayment ? (
          <div className="orders-pending cuenta">
            <label className="orders">CUENTA</label>
          </div>
        ) : (
          <div className="orders-pending">
            <label className="orders"></label>
          </div>
        )}
        <div className="icon-table">
          {size(orders) >= 0 && <GiRoundTable />}
        </div>

        <div className="pendiente">
          {size(orders) > 0 ? (
            <label> PENDIENTE: {size(orders)}</label>
          ) : (
            <label></label>
          )}
        </div>
      </article>
    </main>
  );
}
