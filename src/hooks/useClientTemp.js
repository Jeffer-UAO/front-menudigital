import { useState } from "react";

import { addClientTempApi, getClientTempApi } from "../api/userClient";

export function useClientTemp() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTemp, setUserTemp] = useState(false);

  const addUserTemp = async (data) => {
    try {
      setLoading(true);
      const result = await addClientTempApi(data);
      setLoading(false);
      setUserTemp(result);
    } catch (error) {}
    setLoading(false);
    setError(error);
  };

  const getUserTempById = async (idUser) => {
    try {
      setLoading(true);
      const response = await getClientTempApi(idUser);
      setLoading(false);
      setUserTemp(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const setDataUser = async (data) => {
    try {
      setUserTemp(data);
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    userTemp,
    getUserTempById,
    addUserTemp,
    setDataUser,
  };
}
