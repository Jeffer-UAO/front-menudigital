import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks";

import { BsSearch } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { GiSaucepan } from "react-icons/gi";
import { CgMenu } from "react-icons/cg";


import { GiTable } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";
import { CgReadme } from "react-icons/cg";

import { FaAddressCard } from "react-icons/fa";

import "./NavBarSide.scss";

export function NavBarSide() {
  const { auth } = useAuth();

  const [active, setActive] = useState(false);

  const changeClass = () => setActive((prev) => !prev);

  return (
    <div
      className={classNames("sidebar", {
        active,
      })}
    >
      <div className="logo_content">
        <div className="logo">
          <i className="bx bxl-c-plus-plus"></i>
          <div className="logo_name">
            <h4>PICAPIEDRA</h4>
          </div>
        </div>
        <i className="" id="btn" onClick={changeClass}>
          <CgMenu />
        </i>
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
                    <GiReceiveMoney />
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

        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              <BsSearch />
              <div className="name_job">
                <div className="name">Prem Shahi</div>
                <div className="job">Web Disigner</div>
              </div>
            </div>
            <i className="bx" id="log_out">
              <BsSearch />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
