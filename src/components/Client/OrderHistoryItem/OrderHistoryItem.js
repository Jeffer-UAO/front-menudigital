import React from "react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";

import "./OrderHistoryItem.scss";

export function OrderHistoryItem(props) {
  const { order } = props;
  const { title, image } = order.product_data;

  console.log(order);
  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.create_at).startOf("second").fromNow()}
        </span>
      </div>
      <div className="order-history-item__product">
        <p>imagen</p>
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDIENTE ? (
        <span>Estado: Preparando !!</span>
      ) : (
        <span>Estado: Entregado</span>
      )}
    </div>
  );
}
