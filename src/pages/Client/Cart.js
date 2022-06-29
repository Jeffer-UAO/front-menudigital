import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import { getProductCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";

import "./Client.scss";

export function Cart() { 
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

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

  return (
    <div>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) < 1 ? (
        <div className="cart-no-products">
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <h5>Ver pedidos</h5>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCard={onReloadCard} />
      )}
    </div>
  );
}
