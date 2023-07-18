import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { useCart } from "../../hooks";
import { size } from "lodash";

import { BiDish } from "react-icons/bi";
import { BiBookReader } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { DiRuby } from "react-icons/di";
import { FaOpencart } from "react-icons/fa";

import { useParams, useHistory } from "react-router-dom";
import "./ClientLayout.scss";

export function ClientLayout(props) {
  const { children } = props;
  const { products } = useCart();
  const { tableNumber } = useParams();
  const history = useHistory();

  const closeTable = () => {
    history.push("/");
  };

  const goToCart = () => {
    history.push(`/client/${tableNumber}/cart/`);
  };

  const goToOrders = () => {
    history.push(`/client/${tableNumber}/orders/`);
  };

  const goToMenu = () => {
    history.push(`/client/${tableNumber}/`);
  };

  function goBackHandle() {
    history.goBack();
  }

  console.log(products);
  return (
    <div className="client-content">
      <div className="client-content home">
        <div className="client-content__header">
          <DiRuby size="35" onClick={closeTable} />
          <h3>PICAPIEDRA</h3>
          <p onClick={closeTable} ><u>Cerrar</u></p>
        </div>
        <div className="client-content__menu">
          <span className="back" onClick={goBackHandle}>
            <IoIosArrowBack size="35" />
            <h6>Atras</h6>
          </span>

          <h1 onClick={goToMenu}><u>Menú</u></h1>

          {tableNumber > 0 ? (
            <span>Mesa {tableNumber}</span>
          ) : tableNumber == -1 ? (
            <span>Para llevar</span>
          ) : tableNumber == -2 ? (
            <span>Domicilio</span>
          ) : (
            <span>Recoger en Restaurante</span>
          )}
        </div>
        <div className="client-content__body">{children}</div>

        <div className="client-content__footer">
          <span className="car" onClick={goToCart}>
            <BiCartAlt size="30" />
            {size(products) > 0 ? <p>{size(products)}</p> : ""}

            <h6>CARRITO</h6>
          </span>

          <span onClick={goToOrders}>
            <BiDish size="30" />
            <h6>PEDIDOS</h6>
          </span>
          <span onClick={goToMenu}>
            <BiBookReader size="30" />
            <h6>MENÚ</h6>
          </span>
        </div>
      </div>
    </div>
  );
}
