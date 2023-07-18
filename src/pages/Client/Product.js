import React, { useEffect } from "react";
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
      {loading ? <p>Cargando...</p> : <p></p>}
      <ListProducts products={products}  />
    </>
  );
}
