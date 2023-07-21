import React from "react";
import { useHistory } from "react-router-dom";

import { TopMenu } from "../TopMenu/TopMenu";

import { TiArrowBack } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineGroup } from "react-icons/ai";

import "./HeaderPage.scss";

export function HeaderPage(props) {
  const history = useHistory();
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;

  function goBackHandle() {
    history.goBack();
  }

  return (
    <div className="header">
      <div className="header-page-admin all-header">
        
        <div className="btn-header-page">

          <div className="my-btn" onClick={goBackHandle}>
            <TiArrowBack />
          </div>

          {btnTitle && (
            <div className="my-btn" onClick={btnClick}>
              <IoIosAddCircle />
              <p>{btnTitle}</p>
            </div>
          )}

          {btnTitleTwo && (
            <div className="my-btn" onClick={btnClickTwo}>
              <AiOutlineGroup />
              <p>{btnTitleTwo}</p>
            </div>
          )}
        </div>

        <div className="title-page">
          <TopMenu />
        </div>
      </div>

      <div className="button-menu">
        <h6 className="all-title">{title}</h6>
      </div>
    </div>
  );
}
