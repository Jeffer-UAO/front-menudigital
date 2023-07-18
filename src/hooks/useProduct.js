import { useState } from "react";

import {
  getProductsApi,
  addProductsApi,
  updateProductsApi,
  deleteProductsApi,
  getProductByIdApi,
  getProductsByCategoryApi,
} from "../api/product";
import { useAuth } from "./";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [loadingII, setLoadingII] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);

  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProducts = async (data) => {
    try {
      setLoading(true);
      setLoadingII(true);
      const result = await addProductsApi(data, auth.token);
      setLoadingII(false);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateProducts = async (id, data) => {
    console.log(data);
    try {
      setLoading(true);
      setLoadingII(true);
      await updateProductsApi(id, data, auth.token);
      setLoading(false);
      setLoadingII(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteProducts = async (id) => {
    try {
      setLoading(true);
      await deleteProductsApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProductById = async (idProduct) => {
    try {
      setLoading(true);
      const response = await getProductByIdApi(idProduct);
      setLoading(false);
      setProduct(response);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const getProductsByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryApi(idCategory);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    loadingII,
    error,
    product,
    products,
    getProducts,
    getProductById,
    addProducts,
    updateProducts,
    deleteProducts,
    getProductsByCategory,
  };
}
