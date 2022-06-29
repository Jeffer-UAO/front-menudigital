import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { useHistory } from "react-router-dom";
import { useProduct } from "../../hooks";
import { getProductCart, cleanProductCartApi } from "../../api/cart";
import {
  ListProductCarAdmin,
  CarEmpty,
  HeaderPage,
} from "../../components/Admin";

export function CardAdmin() {
  const history = useHistory();
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductCart();

      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCard = () => setReloadCart((prev) => !prev);

  function goBackHandle() {
    history.goBack();
  }

  return (
    <div className="all-container">
      <div className="header-page">
        <HeaderPage
          title="CARRITO"
          btnTitle="Agregar"
          btnClick={goBackHandle}
        />
      </div>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) < 1 ? (
        <div>
          <CarEmpty />
        </div>
      ) : (
        <>
          <ListProductCarAdmin
            products={products}
            onReloadCard={onReloadCard}
            deleteProducts={cleanProductCartApi}
          />
        </>
      )}
    </div>
  );
}
