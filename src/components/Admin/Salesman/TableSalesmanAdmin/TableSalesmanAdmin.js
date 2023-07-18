import React from "react";
import { CardBody, CardSubtitle } from "reactstrap";
import { map } from "lodash";
import { AiOutlineMore } from "react-icons/ai";

import "./TableSalesmanAdmin.scss";

export function TableSalesmanAdmin(props) {
  const { salesman, updateSalesman, deleteSalesman } = props;
  return (
    <div className="table-sauces-admin">
      {salesman &&
        map(salesman, (salesman, index) => (
          <div className="cart" key={index}>
            <div
              className="table-sauces-admin__sauce"
              // onClick={() => updateProduct(product)}
              //  onClick={() => goToProductDetail(product.id)}
            >
              <CardBody>
                <CardSubtitle>{salesman.description}</CardSubtitle>
              </CardBody>
            </div>

            <div className="menu_links">
              <AiOutlineMore color="white" size={30} />
              <Action
                salesman={salesman}
                updateSalesman={updateSalesman}
                deleteSalesman={deleteSalesman}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

function Action(props) {
  const { salesman, updateSalesman, deleteSalesman } = props;
  //<label onClick={() => addProduct(product.id)}>Agregar al carrito</label>
  //<label onClick={getSaucesActive}>Agregar al carrito</label>
  return (
    <div className="actions">
      <label onClick={() => updateSalesman(salesman)}>Editar</label>
      <label onClick={() => deleteSalesman(salesman)}>Eliminar</label>
    </div>
  );
}
