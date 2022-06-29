import { map } from "lodash";
import React from "react";

import "./AddSaucesToProduct.scss";

export function AddSaucesToProduct(props) {
  const { openCloseModal, sauces } = props;
  return (
    <div className="add-sauce-to-product">
      <div className="add-sauce-to-product__sauces">
        <h6>Elija las salsas</h6>
        {map(sauces, (sauce, index) => (
          <div key={index} className="sauce">
            {sauce.description}

            <div class="toggle-button-cover">
              <div class="button-cover">
                <div class="button r" id="button-3">
                  <input type="checkbox" class="checkbox" />
                  <div class="knobs"></div>
                  <div class="layer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="add-sauce-to-product__comment">
        <h6>Comentario adicional</h6>
        <input type="text"></input>
      </div>
      .{" "}
      <div className="sauce-admin__comment">
        <h6>Cantidad</h6>
        <input type="number"></input>
      </div>
      <button onClick={openCloseModal}>Salir</button>
    </div>
  );
}
