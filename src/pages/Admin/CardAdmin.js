import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { useHistory } from "react-router-dom";
import {
  useProduct,
  useSalesman,
  useAuth,
  useCart,
  useOrder,
  useSaucesOrder,
} from "../../hooks";

import { getProductCart, getTableCart } from "../../api/cart";

import { ModalBasic } from "../../components/Common";
import {
  ListProductCarAdmin,
  CarEmpty,
  HeaderPage,
  AddSalesman,
} from "../../components/Admin";

export function CardAdmin() {
  const { auth } = useAuth();
  const { deleteAllProducts, deleteProduct } = useCart();
  const { salesman, getSalesmanActive } = useSalesman();
  const { addOrderToTable, addOrderEnToTable, orderEn } = useOrder();
  const { addSaucesOrder } = useSaucesOrder();
  const { getProductById } = useProduct();

  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [idTable, setIdTable] = useState(null);

  useEffect(() => {
    setIdTable(getTableCart());
  }, []);

  useEffect(() => {
    getSalesmanActive();
  }, []);

  useEffect(() => {
    let totalTemp = 0;
    //  let subTotalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price * product.amount);
      //    totalDescTemp += Number(product.descount);
      //     totalImpTemp += Number(product.imp);
    });

    setTotal(totalTemp);
  }, [products]);

  useEffect(() => {
    (async () => {
      const ProductsCart = getProductCart();

      const productsArray = [];

      for await (const product of ProductsCart) {
        const response = await getProductById(product.item);
        productsArray.push({ ...response, ...product });
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onReloadCard = () => setReloadCart((prev) => !prev);

  function goBackHandle() {
    history.goBack();
  }

  const setDataOrder = async (salesman) => {
    try {
      const response = await addOrderEnToTable();
      if (response.id > 0) {
        const sall = {
          salesman,
          idTable,
          number: response.id,
          userId: auth.me.id,
        };

        for (var i = 0; i < products.length; i++) {
          const resp = await addOrderToTable(Object.assign(products[i], sall));

          for (var f = 0; f < products[i].sauce.length; f++) {
            await addSaucesOrder(resp.id, products[i].sauce[f].sauces);
          }
        }
      } else {
        console.log("Error en modulo pedido CardAdmin");
      }
    } catch (error) {
      setError(error);
    }
    openCloseModal();
    deleteAllProducts();
    onReloadCard();
    history.push(`/admin/orders`);
  };

  const addSalesman = () => {
    setTitleModal("Datos de entrega");
    setContentModal(
      <AddSalesman
        propducts={products}
        salesman={salesman}
        setDataOrder={setDataOrder}
        removeProductAll={removeProductAll}
        onClose={openCloseModal}  
      />
    );
    openCloseModal();
  };

  const removeProduct = (index) => {
    deleteProduct(index);
    onReloadCard();
  };

  const removeProductAll = (index) => {
    deleteAllProducts();
    onReloadCard();
  };

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
        <div className="container">
          <ListProductCarAdmin
            products={products}
            addSalesman={addSalesman}
            onReloadCard={onReloadCard}
            removeProduct={removeProduct}
            removeProductAll={removeProductAll}
           
          />
        </div>
      )}
      <ModalBasic
        show={showModal}
        title={titleModal}
        children={contentModal}
        onClose={openCloseModal}
      />
    </div>
  );
}
