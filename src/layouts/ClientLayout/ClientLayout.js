import React, { useEffect } from "react";
import { Container, Button } from "reactstrap";
import { useTable } from "../../hooks";
import { useParams, useHistory, Link } from "react-router-dom";
import "./ClientLayout.scss";

export function ClientLayout(props) {
  const { children } = props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const exit = await isExistTable(tableNumber);
      if (!exit) closeTable();
    })();
  }, [tableNumber]);

  const closeTable = () => {
    history.push("/");
  };

  const goToCart = () => {
    history.push(`/client/${tableNumber}/cart`);
  };

  const goToOrders = () => {
    history.push(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <h1>iCard</h1>
          </Link>
          <span>Mesa: {tableNumber}</span>
          <div>
            <Button onClick={goToCart}>Carrito</Button>
            <Button onClick={goToOrders}>Lista</Button>
            <Button onClick={closeTable}>Salir</Button>
          </div>
        </div>

        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
}
