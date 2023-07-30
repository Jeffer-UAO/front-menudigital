import { useState } from "react";
import {
  getTypeApi,
  getTypesApi,
  addTypeApi,
  updateTypeApi,
} from "../api/type";
import { useAuth } from "./";

export function useTypes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState(null);
  const [type, setType] = useState(null);

  const { auth } = useAuth();

  const getTypes = async () => {
    try {
      setLoading(true);
      const response = await getTypesApi(auth.token);
      setLoading(false);
      setTables(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addType = async (data) => {
    try {
      setLoading(true);
      await addTypeApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateType = async (id, data) => {
    try {
      setLoading(true);
      await updateTypeApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getType = async (idType) => {
    try {
      setLoading(true);
      const response = await getTypeApi(idType);
      setLoading(false);
      setTable(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    type,
    types,
    getType,
    getTypes,
    addType,
    updateType,
  };
}
