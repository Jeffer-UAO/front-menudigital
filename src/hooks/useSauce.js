import { useState } from "react";
import {
  getSauceToIdApi,
  getSaucesActiveApi,
  getSaucesApi,
  addSaucesApi,
  updateSaucesApi,
  deleteSauceApi,
  addSaucesToProductApi,
  getSauceToProductApi,
  getSaucesToProductIdApi,
  getSaucesByOrderIdApi,
  deleteSaucesToProductApi,
} from "../api/sauce";
import { useAuth } from "./";

export function useSauces() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sauces, setSauce] = useState(null);
  const [saucesMini, setSaucesMini] = useState(null);
  const [sauceByOrder, setSauceByOrder] = useState(null);

  const data = [];

  const getSauceToId = async (idSauce) => {
    try {
      setLoading(true);
      const response = await getSauceToIdApi(idSauce);
      setLoading(false);

      data.push(response);
      setSauce(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

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

  //------------------------------------

  const addSaucesToProduct = async (idProduct, sauces, name) => {
    try {
      setLoading(true);
      await addSaucesToProductApi(idProduct, sauces, name, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const getSauceToProduct = async (idProduct, idSauce) => {
    try {
      setLoading(true);
      const response = await getSauceToProductApi(idProduct, idSauce);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSaucesToProductId = async (idProduct) => {
    try {
      setLoading(true);
      const response = await getSaucesToProductIdApi(idProduct);
      setLoading(false);
      setSaucesMini(response);      
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteSaucesToProduct = async (idProduct) => {
    try {
      setLoading(true);
      await deleteSaucesToProductApi(idProduct, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSaucesByOrderId = async (idOrder) => {
    
    const sauces = [];
    try {
      setLoading(true);
      const response = await getSaucesByOrderIdApi(idOrder);
      
      if (response && response != "") {   
        for (let i = 0; i < response.length; i++) {
          if(response[i].sauces){
            const result = await getSauceToIdApi(response[i].sauces);
            sauces.push(result);
          }
                 
        }
      }
      setLoading(false);
      setSauceByOrder(sauces);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    sauces,
    saucesMini,
    sauceByOrder,
    getSaucesActive,
    getSauces,
    getSauceToId,
    addSauces,
    updateSauces,
    deleteSauces,
    addSaucesToProduct,
    getSaucesByOrderId,
    getSauceToProduct,
    getSaucesToProductId,
    deleteSaucesToProduct,
  };
}
