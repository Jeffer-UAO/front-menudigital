import React, { useEffect } from "react";
import { usePayment } from "../../hooks";
import { HeaderPage, TablePayments } from "../../components/Admin";
import { Spinner } from "reactstrap";

export function PaymentsHistory() {
  const { payments, loading, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage title="Historial de pagos" />
      </div>
      {loading ? (
        <Spinner>Cargando...</Spinner>
      ) : (
        <TablePayments payments={payments} />
      )}
    </div>
  );
}
