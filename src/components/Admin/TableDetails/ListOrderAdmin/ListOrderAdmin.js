import { forEach, map } from "lodash";
import React, { useEffect, useState } from "react";
import { OrderItemAdmin } from "../";
import { useOrder } from "../../../../hooks";

import "./ListOrderAdmin.scss";

export function ListOrderAdmin(props) {
  const { checkDeliveredOrder, deleteOrderToIdOrder } = useOrder();
  const { orders, onReloadOrders } = props;
  const [orderToUser, setOrderToUser] = useState([]);

  const onCheckDeliveredOrder = async (orderUser) => {
    for await (const order of orders) {
      if (order.user === orderUser && order.status !== "ENTREGADO") {
        await checkDeliveredOrder(order.id);
      }
    }

    for await (const order of orders) {
      if (order.userTemp === orderUser && order.status !== "ENTREGADO") {
        await checkDeliveredOrder(order.id);
      }
    }

    onReloadOrders();
  };

  const deletedOrder = async (orderUser) => {
    for await (const order of orders) {
      if (order.user === orderUser) {
        await deleteOrderToIdOrder(order.id);
      }
    }
    onReloadOrders();
  };

  useEffect(() => {
    var users = [];
    var usersTemp = [];

    forEach(orders, (order) => {
      users.push(order.user);
      usersTemp.push(order.userTemp);
    });
    const listUsers = [...new Set(users)].filter((el) => el != null);
    const listUsersTemp = [...new Set(usersTemp)].filter((el) => el != null);

    setOrderToUser(listUsers.concat(listUsersTemp));
  }, []);

  console.log(orders);
  return (
    <>
      <div className="">
        {map(orderToUser, (orderUser, index) => (
          <div key={index}>
            <div className="list-order__content">
              <div className="list-order__content-header">
                <label>Cliente No. {orderUser}</label>
              </div>

              <div className="list-order__item">
                {map(orders, (order, index) => (
                  <OrderItemAdmin
                    key={index}
                    order={order}
                    onReloadOrders={onReloadOrders}
                    cust={orderUser}
                  />
                ))}
              </div>

              <div className="actions-orders">
                <label
                  className="button-action delete"
                  onClick={() => deletedOrder(orderUser)}
                >
                  Eliminar todo
                </label>
                <label
                  className="button-action delivery"
                  onClick={() => onCheckDeliveredOrder(orderUser)}
                >
                  Entregar todo
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
