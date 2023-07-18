import React, { useEffect } from "react";
import { ProductDetail } from "../../components/Client";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks";

export function Detail() {
  const { loading, product, getProductById } = useProduct();
  const { idProduct } = useParams();

  useEffect(() => {
    getProductById(idProduct);

  }, [idProduct]);

  return (
    <>
    <>{loading ? <p>Cargando...</p> : <ProductDetail product={product} />}</>

    </>
  );
}
