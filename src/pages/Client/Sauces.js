import React, { useEffect } from "react";
import { AddSaucesToProduct } from "../../components/Admin";
import { useParams } from "react-router-dom";
import { useSauces } from "../../hooks";

export function Sauces() {
  const { loading, getSaucesActive, sauces } = useSauces();
  const { idProduct } = useParams();

  useEffect(() => {
    getSaucesActive();
  }, [idProduct]);

  return (
    <>{loading ? <p>Cargando...</p> : <AddSaucesToProduct sauces={sauces} />}</>
  );
}
