import React, { useEffect } from "react";
import { HeaderPage, TableListAdmin } from "../../components/Admin";
import { Spinner } from "reactstrap";
import { useTable} from "../../hooks";

export function OrdersAdmin() {
 // const { auth } = useAuth();
  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    getTables();
  }, []);

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage title="Administración de pedidos" />
      </div>
      <div className="containerBody">
        {loading ? (
          <Spinner>Cargando...</Spinner>
        ) : (
          <div className="orders_admin">
            <TableListAdmin tables={tables} />
          </div>
        )}
      </div>
    </div>
  );
}
