import { useState } from "react";
import {
  getOrderByTableApi,
  checkDeliveredOrderApi,
  addPaymentToOrderApi,
  closeOrderApi,
  getOrdersByPaymentApi,
  addOrderToTableApi,
  getOrderByUserApi,
  deleteOrderToIdOrderApi,
  addOrderEnToTableApi,
} from "../api/order";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);
  const [orderEn, setOrderEn] = useState(null);

  const getOrdersByTable = async (idTable, status, ordering) => {
    
    try {
      setLoading(true);
      const response = await getOrderByTableApi(idTable, status, ordering);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOrdersByUser = async (idUser, tableId, status, ordering) => {
  
    try {
      setLoading(true);
      const response = await getOrderByUserApi(
        idUser,
        tableId,
        status,
        ordering
      );      
      setLoading(false);     
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const checkDeliveredOrder = async (idOrder) => {
    try {
      await checkDeliveredOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const deleteOrderToIdOrder = async (idOrder) => {
    try {
      await deleteOrderToIdOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      await addPaymentToOrderApi(idOrder, idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const closeOrder = async (idOrder) => {
    try {
      await closeOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const getOrdersByPayment = async (idPayment) => {
    try {
      return await getOrdersByPaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const addOrderToTable = async (dataOrder) => {
    try {
      setLoading(true);
      const response = await addOrderToTableApi(
        dataOrder.idTable,
        dataOrder.id,
        dataOrder.userId,
        dataOrder.comment,
        dataOrder.amount,
        dataOrder.price,
        dataOrder.salesman,
        dataOrder.number,
        //  dataOrder.sauce,
        dataOrder.userTemp
      );
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const addOrderEnToTable = async () => {
    try {
      setLoading(true);
      const response = await addOrderEnToTableApi();
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    orders,
    orderEn,
    getOrdersByTable,
    checkDeliveredOrder,
    addPaymentToOrder,
    closeOrder,
    getOrdersByPayment,
    addOrderToTable,
    getOrdersByUser,
    deleteOrderToIdOrder,
    addOrderEnToTable,
  };
}
