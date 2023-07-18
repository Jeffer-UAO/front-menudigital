import { useState } from "react";
import { size } from "lodash";
import {
  getTableApi,
  getTablesApi,
  addTablesApi,
  updateTablesApi,
  deleteTablesApi,
  getTableByNumberApi,
} from "../api/table";
import { useAuth } from "./";

export function useTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);

  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi(auth.token);
      setLoading(false);
      setTables(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addTable = async (data) => {
    try {
      setLoading(true);
      await addTablesApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateTable = async (id, data) => {
    try {
      setLoading(true);
      await updateTablesApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteTable = async (id) => {
    try {
      setLoading(true);
      await deleteTablesApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTable = async (idTable) => {
    try {
      setLoading(true);
      const response = await getTableApi(idTable);
      setLoading(false);
      setTable(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const isExistTable = async (tableNumber) => {
    try {
      const response = await getTableByNumberApi(tableNumber);
      if (size(response) === 0) throw error();
      return true;
    } catch (error) {
      setError(error);
    }
  };

  const getTableByNumber = async (tableNumber) => {
    try {
      const response = await getTableByNumberApi(tableNumber);
      setTable(response);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    table,
    getTable,
    tables,
    getTables,
    addTable,
    updateTable,
    deleteTable,
    isExistTable,
    getTableByNumber,
  };
}
