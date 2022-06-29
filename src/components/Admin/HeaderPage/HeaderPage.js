import React from "react";
import { useHistory } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";

import "./HeaderPage.scss";

export function HeaderPage(props) {
  const history = useHistory();
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;

  function goBackHandle() {
    history.goBack();
  }

  return (
    <div className="header-page-admin all-header">
      <div className="btn-header-page">
        <div className="my-btn" onClick={goBackHandle}>
          <span className="btn-back">
            <TiArrowBack />
          </span>

          <p>Regresar</p>
        </div>

        {btnTitle && (
          <div className="my-btn">
            <span className="btn-add">
              <IoIosAddCircle onClick={btnClick} />
            </span>

            <label>{btnTitle}</label>
          </div>
        )}
        {btnTitleTwo && (
          <div className="my-btn">
            <span>
              <IoIosAddCircle onClick={btnClickTwo} />
            </span>
            <label>{btnTitleTwo}</label>
          </div>
        )}
      </div>
      <div className="title-page">
        <h1 className="all-title">{title}</h1>
      </div>
    </div>
  );
}
