import { useState } from "react";
import { addSauceToOrderApi } from "../api/sauceorder";
import { useAuth } from "./";

export function useSaucesOrder() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addSaucesOrder = async (idOrder, idSauce) => {
    try {
      setLoading(true);
      await addSauceToOrderApi(idOrder, idSauce);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    error,
    loading,
    addSaucesOrder,
  };
}
