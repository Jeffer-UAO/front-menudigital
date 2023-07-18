import { useState } from "react";
import {
  getSalesmanToIdApi,
  getSalesmanActiveApi,
  getSalesmanApi,
  addSalesmanApi,
  updateSalesmanApi,
  deleteSalesmanApi,
} from "../api/salesman";
import { useAuth } from "./";

export function useSalesman() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesman, setSalesman] = useState(null);
  const data = [];

  const getSalesmanToId = async (idSalesman) => {
    try {
      setLoading(true);
      const response = await getSalesmanToIdApi(idSalesman);
      setLoading(false);
      data.push(response);
      setSalesman(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSalesmanActive = async () => {
    try {
      setLoading(true);
      const response = await getSalesmanActiveApi();
      setLoading(false);
      setSalesman(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSalesman = async () => {
    try {
      setLoading(true);
      const response = await getSalesmanApi();
      setLoading(false);
      setSalesman(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addSalesman = async (data) => {
    try {
      setLoading(true);
      const response = await addSalesmanApi(data, auth.token);

      setLoading(false);
      setSalesman(response);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateSalesman = async (id, data) => {
    try {
      setLoading(true);
      await updateSalesmanApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteSalesman = async (id) => {
    try {
      setLoading(true);
      await deleteSalesmanApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    salesman,
    getSalesmanActive,
    getSalesman,
    getSalesmanToId,
    addSalesman,
    updateSalesman,
    deleteSalesman,
  };
}
