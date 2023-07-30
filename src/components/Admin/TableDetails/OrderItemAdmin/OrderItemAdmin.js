import classNames from "classnames";
import { map } from "lodash";
import moment from "moment";
import "moment/locale/es";
import React, { useEffect, useState } from "react";
import { BsAlarm } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { Button, CardImg, Spinner } from "reactstrap";
import { useOrder, useSauces } from "../../../../hooks";
import { ORDER_STATUS } from "../../../../utils/constants";

import "./OrderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { cust, order, onReloadOrders } = props;
  const { checkDeliveredOrder, deleteOrderToIdOrder } = useOrder();
  const { sauceByOrder, getSaucesByOrderId } = useSauces();
  const { image } = order.product_data;

  const [loading, setLoading ] = useState(false);

  useEffect(() => {
    (async () => {
      getSaucesByOrderId(order.id);
    })();
  }, []);

  const onCheckDeliveredOrder = async () => {
    setLoading(true);
    await checkDeliveredOrder(order.id);
    onReloadOrders();
  };

  const deletedOrder = async () => {
    const result = window.confirm("¿Desea eliminar este producto?");
    if (result) {
      await deleteOrderToIdOrder(order.id);
      onReloadOrders();
    }
  };

  return (
    <div className="order">
      {cust === order.user && (
        <div
          className={classNames("order-item-admin", {
            [order.status.toLowerCase()]: true,
          })}
        >
          <div className="order-item-admin__time">
            <span>{moment(order.create_at).format("HH:mm")}</span> {" - "}
            <span>
              {moment(order.create_at).startOf("secods").fromNow()}
            </span>{" "}
            <BsAlarm size={15} />
          </div>

          <div className="order-item-admin__product">
            <CardImg src={image} />
            <div className="description">
              <div className="number-order">
                <label>Pedido No. {order.number} </label>
                <div className="delete-item" onClick={deletedOrder}>
                  <MdDeleteForever size={25} />
                </div>
              </div>

              <h5>{order.product_data.title}</h5>
              <h5>
                Cantidad <label>{order.qty}</label>
              </h5>
            </div>
          </div>
          <div className="sauce-comment">
            <div className="sauce">
              {map(sauceByOrder, (sauce, index) => (
                <div className="items" key={index}>
                  {sauce.description}
                </div>
              ))}
            </div>
            <div className="comment">
              Nota: <label>{order.comment}</label>
            </div>
          </div>
          <div className="btn-ations">
            {order.status === ORDER_STATUS.PENDIENTE && (
              <div className="action">
                {loading ? (
                  <Button disabled block>
                    <Spinner>Cargando...</Spinner>
                  </Button>
                ) : (
                  <Button
                    active
                    block
                    color="success"
                    onClick={onCheckDeliveredOrder}
                  >
                    Entregar este producto
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {cust === order.userTemp && (
        <div
          className={classNames("order-item-admin", {
            [order.status.toLowerCase()]: true,
          })}
        >
          <div className="order-item-admin__time">
            <span>{moment(order.create_at).format("HH:mm")}</span> {" - "}
            <span>
              {moment(order.create_at).startOf("secods").fromNow()}
            </span>{" "}
            <BsAlarm />
          </div>

          <div className="order-item-admin__product">
            <div>
              <CardImg src={image} />
            </div>
            <div className="description">
              <div className="number-order">
                <label>Pedido No. {order.number} </label>
                <div className="delete-item" onClick={deletedOrder}>
                  <MdDeleteForever size={22} />
                </div>
              </div>

              <h5>{order.product_data.title}</h5>
              <h5>
                Cantidad <label>{order.qty}</label>
              </h5>
            </div>
          </div>
          <div className="sauce-comment">
            <div className="sauce">
              {map(sauceByOrder, (sauce, index) => (
                <div className="items" key={index}>
                  {sauce.description}
                </div>
              ))}
            </div>
            <div className="comment">
              Nota: <label>{order.comment}</label>
            </div>
          </div>
          <div className="btn-ations">
            {order.status === ORDER_STATUS.PENDIENTE && (
              <div className="action">
                 {loading ? (
                  <Button disabled block>
                    <Spinner>Cargando...</Spinner>
                  </Button>
                ) : (
                  <Button
                    active
                    block
                    color="success"
                    onClick={onCheckDeliveredOrder}
                  >
                    Entregar este producto
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
