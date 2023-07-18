import React from "react";
import { CardBody, CardSubtitle } from "reactstrap";
import { map } from "lodash";
import { AiOutlineMore } from "react-icons/ai";

import "./TableGroupAdmin.scss";

export function TableGroupAdmin(props) {
  const { groups, updateGroup, deleteGroup } = props;
  console.log(groups);
  return (
    <div className="table-sauces-admin">
      {groups &&
        map(groups, (group, index) => (
          <div className="cart" key={index}>
            <div
              className="table-sauces-admin__sauce"
              // onClick={() => updateProduct(product)}
              //  onClick={() => goToProductDetail(product.id)}
            >
              <CardBody>
                <CardSubtitle>{group.description}</CardSubtitle>
              </CardBody>
            </div>

            <div className="menu_links">
              <AiOutlineMore color="white" size={30} />
              <Action
                group={group}
                updateGroup={updateGroup}
                deleteGroup={deleteGroup}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

function Action(props) {
  const { group, updateGroup, deleteGroup } = props;
  //<label onClick={() => addProduct(product.id)}>Agregar al carrito</label>
  //<label onClick={getSaucesActive}>Agregar al carrito</label>
  return (
    <div className="actions">
      <label onClick={() => updateGroup(group)}>Editar</label>
      <label onClick={() => deleteGroup(group)}>Eliminar</label>
    </div>
  );
}
