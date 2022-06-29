import React, { useState, useEffect, createContext } from "react";

import {
  addProductCart,
  getProductCart,
  cleanProductCartApi,
  removeProductCardApi,
} from "../api/cart";

export const CartContext = createContext({
  addProduct: () => null,
  deleteProduct: () => null,
  deleteAllProducts: () => null,
  refreshCart: () => null,
  products: "",
});

export function CartProvider(props) {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setProducts(getProductCart());
      } catch (error) {
        throw error;
      }
    })();
  }, [reloadCart]);

  const onReloadCard = () => setReloadCart((prev) => !prev);

  const addProduct = async (id) => {
    addProductCart(id);
    onReloadCard();
  };

  const deleteProduct = async (id) => {
    removeProductCardApi(id);
    onReloadCard();
  };

  const deleteAllProducts = async () => {
    cleanProductCartApi();
    onReloadCard();
  };

  const valueContext = {
    deleteAllProducts,
    deleteProduct,
    addProduct,
    products,
  };

  return (
    <CartContext.Provider value={valueContext}>{children}</CartContext.Provider>
  );
}
