import { BASE_API, ORDER_STATUS } from "../utils/constants";

//const BASE_API = localStorage.getItem(BASE_PATH);

export async function getOrderByTableApi(idTable, status = "", ordering = "") {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `status=${status}`;
    const closeFilter = "close=False";

    const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
   
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getOrderByUserApi(
  user,
  tableId,
  userTemp,
  status = "PENDIENTE",
  ordering = ""
) {
  try {
    const tableFilter = `table=${tableId}`;
    const userFilter = `user=${user}`;
    const userTempFilter = `userTemp=${userTemp}`; 
    const statusFilter = `status=${status}`;
    const closeFilter = "close=False";

    const url = `${BASE_API}/api/orders/?${userFilter}&${tableFilter}&${userTempFilter}&${statusFilter}&${closeFilter}&${ordering}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkDeliveredOrderApi(id) {
  try {
    const url = `${BASE_API}/api/orders/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.ENTREGADO,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addPaymentToOrderApi(idOrder, idPayment) {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: idPayment,
      }),
    };
    await fetch(url, params);    
  } catch (error) {
    throw error;
  }
}

export async function closeOrderApi(idOrder) {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        close: true,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByPaymentApi(idPayment) {
  try {
    const paymentFilter = `payment=${idPayment}`;

    const url = `${BASE_API}/api/orders/?${paymentFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addOrderToTableApi(
  idTable,
  idProduct,
  idUser,
  comment,
  qty,
  price,
  idSalesman,
  number,
  userTemp
) {
  try {
    const url = `${BASE_API}/api/orders/`;
   
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.PENDIENTE,
        table: idTable,
        product: idProduct,
        user: idUser,
        salesman: idSalesman,
        comment,
        qty,
        price,
        number,
        userTemp,
        // sauces,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function addOrderEnToTableApi() {
  try {
    const url = `${BASE_API}/api/orderen/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({}),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteOrderToIdOrderApi(idOrder) {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "DELETE",
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
