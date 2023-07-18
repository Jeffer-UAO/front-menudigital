import { size } from "lodash";
import React from "react";
import { useAuth, useCart } from "../../../hooks";

import { FaOpencart } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import "./TopMenu.scss";

export function TopMenu() {
  const history = useHistory();

  const { auth, logout } = useAuth();
  const { products } = useCart();

  console.log(products);
  
  const renderName = () => {
    if (auth.me?.first_name && auth.me?.last_name) {
      return `${auth.me.first_name} ${auth.me.last_name}`;
    } else if (auth.me?.username) {
      return auth.me.username;
    }
    return <p>Anonymous</p>;
  };

  const closeSection = () => {
    const result = window.confirm("¿Seguro desea salir de la aplicación?");
    if (result) {
      logout();
    }
  };

  function goToCar() {
    history.push(`/admin/products/car`);
  }

  return (
    <div className="top-menu-admin">
      <div className="top-menu-admin__car">
        <span>Bienvenido: {renderName()} </span>
        
        <div className="car" onClick={goToCar}>
          <FaOpencart size={30} />
          <p>{size(products)}</p>
        </div>

        <div onClick={closeSection} className="logout"><p>Salir</p></div>
      </div>
    </div>
  );
}
