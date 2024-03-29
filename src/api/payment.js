import { BASE_API, PAYMENT_STATUS } from "../utils/constants";

//const BASE_API = localStorage.getItem(BASE_PATH);


export async function createPaymentApi(paymentData) {
  try {
    const url = `${BASE_API}/api/payments/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPaymentByTableApi(idTable) {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `statusPayment=${PAYMENT_STATUS.PENDIENTE}`;

    const url = `${BASE_API}/api/payments/?${tableFilter}&${statusFilter}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function closePaymentApi(idPayment) {
  try {
    const url = `${BASE_API}/api/payments/${idPayment}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statusPayment: PAYMENT_STATUS.PAGADO,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function getPaymentsApi() {
  try {
    const paymentFilter = `statusPayment=${PAYMENT_STATUS.PAGADO}`;
    const orderingFilter = "ordering=create_at";

    const url = `${BASE_API}/api/payments/?${paymentFilter}&${orderingFilter}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
