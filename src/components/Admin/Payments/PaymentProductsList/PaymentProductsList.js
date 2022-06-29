import React, { useEffect, useState } from "react";
import { useOrder } from "../../../../hooks";
import { map } from "lodash";

import "./PaymentProductsList.scss";

export function PaymentProductsList(props) {
  const { getOrdersByPayment } = useOrder();
  const { payment } = props;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
  }, []);

  return (
    <div className="payment-product-list-admin">
      {map(orders, (order) => (
        <div key={order.id} className="payment-product-list-admin__product">
          <p>{order.product_data.title}</p>
          <p>{order.product_data.price}</p>
        </div>
      ))}
    </div>
  );
}
