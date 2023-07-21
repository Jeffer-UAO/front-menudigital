import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks";

import { GrRestaurant } from "react-icons/gr";
import { BiCategoryAlt } from "react-icons/bi";
import { GiSaucepan } from "react-icons/gi";
import { CgMenu } from "react-icons/cg";
import { BsCurrencyDollar } from "react-icons/bs";

import { GiTable } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";
import { CgReadme } from "react-icons/cg";

import { FaAddressCard } from "react-icons/fa";

import "./NavBarSide.scss";

export function NavBarSide() {
  const { auth, logout } = useAuth();

  const [active, setActive] = useState(false);

  const changeClass = () => setActive((prev) => !prev);

  return (
    <div
      className={classNames("sidebar", {
        active,
      })}
    >
      <div className="logo_content">
        <div className="btn-menu">
          <div className="logo">            
              <GrRestaurant size={60} />           
          </div>
          <i className="icon" id="btn" onClick={changeClass}>
            <CgMenu />
          </i>
        </div>

        <div className="link">
          <ul className="nav_list">
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/admin/orders"
              >
                <div className="a">
                  <i className="bx bx-grid-alt">
                    <CgReadme />
                  </i>
                  <span className="links_name">Ordenes</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/admin/tables"
              >
                <div className="a">
                  <i className="bx bx-grid-alt">
                    <GiTable />
                  </i>
                  <span className="links_name">Mesas</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/admin/payments-history"
              >
                <div className="a">
                  <i className="bx bx-grid-alt">
                    <BsCurrencyDollar />
                  </i>
                  <span className="links_name">Pagos</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/admin/categories"
              >
                <div className="a">
                  <i className="bx bx-grid-alt">
                    <BiCategoryAlt />
                  </i>
                  <span className="links_name">Categorias</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/admin/sauce"
              >
                <div className="a">
                  <i className="bx bx-grid-alt">
                    <GiSaucepan />
                  </i>
                  <span className="links_name">Salsas</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/admin/products"
              >
                <div className="a">
                  <i className="bx bx-grid-alt">
                    <GiHotMeal />
                  </i>
                  <span className="links_name">Productos</span>
                </div>
              </NavLink>
            </li>

            <li>
              {auth.me?.is_staff && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/admin/users"
                >
                  <div className="a">
                    <i className="bx bx-grid-alt">
                      <FaAddressCard />
                    </i>
                    <span className="links_name">Usuarios</span>
                  </div>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
