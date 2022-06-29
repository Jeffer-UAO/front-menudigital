import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../../components/Client";

export function Categories() {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div>
        <h5>...</h5>
        <h5>MENÚ PICAPIEDRA</h5>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ListCategories categories={categories} />
      )}
    </>
  );
}
