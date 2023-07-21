import React from "react";
import { LoginAdmin } from "../../pages/Admin";
import { useAuth } from "../../hooks";
import { useHistory } from "react-router-dom";
import {
  TopMenu,
  //NavBarAdmin,
  //FooterAdmin,
  NavBarSide,
  HeaderPage,
} from "../../components/Admin";

import "./AdminLayout.scss";
//
export function AdminLayout(props) {
  const { children } = props;
  const { auth } = useAuth();
  const history = useHistory();

  function goBackHandle() {
    history.goBack();
  }

  if (!auth) return <LoginAdmin />;

  /**
     <div className="nav">
          <NavBarAdmin />
        </div>

        <div className="footer">
          <FooterAdmin />
        </div>
   */

  return (
    <div className="content">

      <div className="navSide">
        <NavBarSide />
      </div>

      <div className="content home">
        <div className="body">{children}</div>
      </div>

    </div>
  );
}
