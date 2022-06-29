import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client";

export function Product() {
  const { loading, products, getProductsByCategory } = useProduct();
  const { idCategory } = useParams();

  useEffect(() => {
    getProductsByCategory(idCategory);
  }, [idCategory]);

  return (
    <>
      {loading ? <p>Cargando...</p> : <p>Lista de productos</p>}
      <ListProducts products={products} />
    </>
  );
}
