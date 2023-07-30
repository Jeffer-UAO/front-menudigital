import { forEach, map } from "lodash";
import React, { useEffect, useState } from "react";
import { OrderItemAdmin } from "../";
import { useOrder } from "../../../../hooks";
import { Button, Spinner } from "reactstrap";

import "./ListOrderAdmin.scss";

export function ListOrderAdmin(props) {
  const { checkDeliveredOrder, deleteOrderToIdOrder } = useOrder();
  const { orders, onReloadOrders } = props;
  const [orderToUser, setOrderToUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onCheckDeliveredOrder = async (orderUser) => {
    setLoading(true);
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
    setLoading2(true);
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
                {loading2 ? (
                  <Button block disabled>
                    <Spinner>Cargando...</Spinner>
                  </Button>
                ) : (
                  <Button block onClick={() => deletedOrder(orderUser)}>
                    Eliminar todo
                  </Button>
                )}

                {loading ? (
                  <Button disabled block>
                    <Spinner>Cargando...</Spinner>
                  </Button>
                ) : (
                  <Button
                    active
                    block
                    color="success"
                    onClick={() => onCheckDeliveredOrder(orderUser)}
                  >
                    Entregar todo
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
