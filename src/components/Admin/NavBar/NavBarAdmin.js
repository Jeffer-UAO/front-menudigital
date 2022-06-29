import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { GiTabletopPlayers } from "react-icons/gi";
import { GiTable } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { GiHotMeal } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa";

//import { ReactComponent as SvgPlato } from "../../../assets/plato.svg";

import "./NavBarAdmin.scss";

export function NavBarAdmin() {
  const { auth } = useAuth();

  return (
    <div className="nav-bar-admin" id="nav-bar">
      <div className="nav-bar-admin__options">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/admin/orders"
        >
          <div className="option">
            <i title="products"></i>
            <GiHotMeal />
            <p>Ordenes</p>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/admin/tables"
        >
          <div className="option">
            <i title="tables"></i>
            <GiTable />
            <p>MESAS</p>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/admin/payments-history"
        >
          <div className="option">
            <i title="payments-history"></i>
            <GiReceiveMoney />
            <p>PAGOS</p>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/admin/categories"
        >
          <div className="option">
            <i title="categories"></i>
            <BiCategoryAlt />
            <p>CATEGORIAS</p>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/admin/products"
        >
          <div className="option">
            <i title="products"></i>
            <GiHotMeal />
            <p>PRODUCTOS</p>
          </div>
        </NavLink>
        {auth.me?.is_staff && (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/admin/users"
          >
            <div className="option">
              <i title="users"></i>
              <FaAddressCard />
              <p>USUARIOS</p>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}
