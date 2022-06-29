import React from "react";
import { CardBody, CardSubtitle } from "reactstrap";
import { map } from "lodash";
import { AiOutlineMore } from "react-icons/ai";

import "./TableSaucesAdmin.scss";

export function TableSaucesAdmin(props) {
  const { sauces, updateSauce, deleteSauce } = props;
  return (
    <div className="table-sauces-admin">
      {sauces &&
        map(sauces, (sauce, index) => (
          <div className="cart" key={index}>
            <div
              className="table-sauces-admin__sauce"
              // onClick={() => updateProduct(product)}
              //  onClick={() => goToProductDetail(product.id)}
            >
              <CardBody>
                <CardSubtitle>{sauce.description}</CardSubtitle>
              </CardBody>
            </div>

            <div className="menu_links">
              <AiOutlineMore color="white" size={30} />
              <Action
                sauce={sauce}
                updateSauce={updateSauce}
                deleteSauce={deleteSauce}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

function Action(props) {
  const { sauce, updateSauce, deleteSauce } = props;
  //<label onClick={() => addProduct(product.id)}>Agregar al carrito</label>
  //<label onClick={getSaucesActive}>Agregar al carrito</label>
  return (
    <div className="actions">
      <label onClick={() => updateSauce(sauce)}>Editar</label>
      <label onClick={() => deleteSauce(sauce)}>Eliminar</label>
    </div>
  );
}
