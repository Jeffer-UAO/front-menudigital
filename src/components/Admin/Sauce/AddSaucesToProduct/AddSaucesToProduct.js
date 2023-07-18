import { map } from "lodash";

import "./AddSaucesToProduct.scss";

export function AddSaucesToProduct(props) {
  const { sauces } = props;

  return (
    <div className="add-sauce-to-product">
      <div className="add-sauce-to-product__sauces">
        <h6>Elija las salsas</h6>
        {map(sauces, (sauce, index) => (
          <div key={index} className="sauce">
            {sauce.description}

            <div className="toggle-button-cover">
              <div className="button-cover">
                <div className="button r" id="button-3">
                  <input type="checkbox" className="checkbox" />
                  <div className="knobs"></div>
                  <div className="layer"></div>
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
    </div>
  );
}
