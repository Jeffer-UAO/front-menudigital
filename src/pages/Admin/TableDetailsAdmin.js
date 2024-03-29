import { useState, useEffect } from "react";
import { useOrder, useTable, usePayment } from "../../hooks";
import { getTableCart } from "../../api/cart";
import { forEach, size } from "lodash";
import {
  HeaderPage,
  ListOrderAdmin,
  AddOrderForm,
  PaymentDetail,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { Spinner } from "reactstrap";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const id = getTableCart();
  const [paymentData, setPaymentData] = useState(null);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTable, table } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,create_at");
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      
        const response = await getPaymentByTable(id);
        if (size(response) > 0) setPaymentData(response[0]);
 
    })();
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm(
      "¿Estas seguro de generar la cuenta de la mesa"
    );

    if (result) {
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        "¿Pago con tarjeta pulsa ok, con efectivo pulsa cancelar"
      );

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? "TARJETA" : "EFECTIVO",
        statusPayment: "PENDIENTE",
      };

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }
      onReloadOrders();
    }
  };

  console.log(orders);

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage
          title={`Mesa ${table?.number || ""}`}
          btnTitle={paymentData ? "Ver cuenta" : "Nuevo Pedido"}
          btnClick={openCloseModal}
          btnTitleTwo={size(orders) > 0 && !paymentData ? "Generar cuenta" : null}
          btnClickTwo={onCreatePayment}
        />
      </div>
      {loading ? (
        <Spinner>Cargando...</Spinner>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Categorías"
        //   size="sm"
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </div>
  );
}
