import React from "react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";

import "./OrderHistoryItem.scss";

export function OrderHistoryItem(props) {
  const { order } = props;
  const { title, image } = order.product_data;


  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.create_at).startOf("second").fromNow()}
          <h4>{title}</h4>
        </span>
      </div>
      <span className="order-history-item__product">
        <div>
          <img src={image} alt="Card image cap" />
        </div>
      </span>
      <div>
        {order.status === ORDER_STATUS.PENDIENTE ? (
          <h5>Estado: Pendiente</h5>
        ) : (
          <h6>Estado: Entregado</h6>
        )}
      </div>
    </div>
  );
}
