import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { useHistory, Link, useParams } from "react-router-dom";
import { ModalBasic } from "../../components/Common";
import {
  useProduct,
  useCart,
  useTable,
  useOrder,
  useSaucesOrder,
} from "../../hooks";
import { getProductCart, getTableCart, getClientCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";
import { CarEmpty, ListProductCarAdmin } from "../../components/Admin";

//import { useHistory } from "react-router-dom";

import "./Client.scss";

export function Cart() {
  const [error, setError] = useState(null);
  const [idTable, setIdTable] = useState(null);
  const [idClient, setIdClient] = useState("");
  const [products, setProducts] = useState("");
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { deleteAllProducts, deleteProduct } = useCart();
  const { addOrderToTable, addOrderEnToTable, orderEn } = useOrder();
  const { getTableByNumber, table } = useTable();
  const { addSaucesOrder } = useSaucesOrder();
  const history = useHistory();
  const { tableNumber } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    (async () => {
      const productsArray = [];

      const ProductsCart = await getProductCart();

      for await (const product of ProductsCart) {
        const response = await getProductById(product.item);
        productsArray.push({ ...response, ...product });
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCard = () => setReloadCart((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const removeProduct = (index) => {
    deleteProduct(index);
    onReloadCard();
  };

  const addCategory = () => {
    setContentModal(<h1>Enviando...</h1>);
    openCloseModal();
  };

  useEffect(() => {
    getTableByNumber(tableNumber);
  }, []);

  useEffect(() => {
    const result = getClientCart();
    setIdClient(result);
  }, []);

  const removeProductAll = (index) => {
    const result = window.confirm(`¿Desea borrar todo el carrito?`);
    if (result) {
      deleteAllProducts();
      onReloadCard();
    }
  };

  const addSalesman = async () => {
    addCategory();
    try {
      const response = await addOrderEnToTable();

      if (response.id > 0) {
        const sall = {
          idTable: table[0].id,
          number: response.id,
          userTemp: idClient.id,
          // userId: idClient,
        };

        for (var i = 0; i < products.length; i++) {
          const resp = await addOrderToTable(Object.assign(products[i], sall));

          for (var f = 0; f < products[i].sauce.length; f++) {
            if (products[i].sauce[f].id) {
              //
              await addSaucesOrder(resp.id, products[i].sauce[f].sauces);
            }
          }
        }
      } else {
        console.log("Error al momento de cargar el pedido Cart.js");
      }
    } catch (error) {
      setError(error);
    }
    deleteAllProducts();
    onReloadCard();

    history.push(`/client/${tableNumber}/orders`);
  };

  return (
    <div>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) < 1 ? (
        <>
          <div className="cart-no-products">
            <p></p>
            <Link to={`/client/${tableNumber}/orders`}>
              <h5>Ver pedidos</h5>
            </Link>
          </div>
          <CarEmpty />
        </>
      ) : (
        <ListProductCarAdmin
          products={products}
          addSalesman={addSalesman}
          onReloadCard={onReloadCard}
          removeProduct={removeProduct}
          removeProductAll={removeProductAll}
        />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        children={contentModal}
        size="lg"
      />
    </div>
  );
}
