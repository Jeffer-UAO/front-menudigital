import React from "react";
import { useOrder } from "../../../../hooks";
import { CardImg } from "reactstrap";
import { ORDER_STATUS } from "../../../../utils/constants";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";

import "./OrderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { checkDeliveredOrder } = useOrder();
  const { order, onReloadOrders } = props;
  const { title, image } = order.product_data;

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.create_at).format("HH:mm")}</span> {" - "}
        <span>{moment(order.create_at).startOf("secods").fromNow()}</span>
      </div>

      <div className="order-item-admin__product">
        <div>
          <CardImg src={image} />
        </div>
        <div>
          <div className="description">
            <p>{title}</p>
            <p>Cantidad: 4</p>
          </div>
          {order.status === ORDER_STATUS.PENDIENTE ? (
            <div className="action">
              <h6 onClick={() => console.log("Cancelar")}>Quitar</h6>
              <h6 color="success" onClick={onCheckDeliveredOrder}>
                Entregar
              </h6>
            </div>
          ) : (
            <span>¡Entregado!</span>
          )}
        </div>
      </div>
    </div>
  );
}
