import { useState } from "react";
import {
  getSaucesActiveApi,
  getSaucesApi,
  addSaucesApi,
  updateSaucesApi,
  deleteSauceApi,
} from "../api/sauce";
import { useAuth } from "./";

export function useSauces() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sauces, setSauce] = useState(null);

  const getSaucesActive = async () => {
    try {
      setLoading(true);
      const response = await getSaucesActiveApi();
      setLoading(false);
      setSauce(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSauces = async () => {
    try {
      setLoading(true);
      const response = await getSaucesApi();
      setLoading(false);
      setSauce(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addSauces = async (data) => {
    try {
      setLoading(true);
      const response = await addSaucesApi(data, auth.token);

      setLoading(false);
      setSauce(response);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateSauces = async (id, data) => {
    try {
      setLoading(true);
      await updateSaucesApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteSauces = async (id) => {
    try {
      setLoading(true);
      await deleteSauceApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    sauces,
    getSaucesActive,
    getSauces,
    error,
    addSauces,
    updateSauces,
    deleteSauces,
  };
}
