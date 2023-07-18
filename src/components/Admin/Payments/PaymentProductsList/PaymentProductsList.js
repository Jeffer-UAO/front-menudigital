import React, { useEffect, useState } from "react";
import { size, forEach } from "lodash";
import { useOrder } from "../../../../hooks";
import { map } from "lodash";

import "./PaymentProductsList.scss";

export function PaymentProductsList(props) {
  const { getOrdersByPayment } = useOrder();
  const { payment } = props;

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

 

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
  }, []);

  useEffect(() => {
    let totalTemp = 0;
    //  let subTotalTemp = 0;
    forEach(orders, (order) => {
      totalTemp += Number(order.price * order.qty);
      //    totalDescTemp += Number(product.descount);
      //     totalImpTemp += Number(product.imp);
    });

    setTotal(totalTemp);
  }, [orders]);


  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  console.log(total);

  return (
    <div className="payment-product-list-admin">
      {map(orders, (order) => (
        <div key={order.id} className="payment-product-list-admin__product">
          <p className="title">{order.product_data.title}</p>
          <p className="qty">{order.qty}</p>
          <p className="price">$ {formatNumber(order.product_data.price*order.qty)}</p>
        </div>
      ))}
      <div className="total">
        <h5>Total</h5>
        <h5><p>$ {formatNumber(total)}</p></h5>
      </div>
    </div>
  );
}
