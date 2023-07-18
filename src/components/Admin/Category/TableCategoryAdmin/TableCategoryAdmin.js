import React from "react";
import { CardImg, CardBody, CardTitle } from "reactstrap";
import { map } from "lodash";
import { AiOutlineMore } from "react-icons/ai";
import "./TableCategoryAdmin.scss";

export function TableCategoryAdmin(props) {
  const { categories, updateCategory, onDeleteCategory } = props;
  return (
    <div className="table-category-admin containerBody">
      {map(categories, (category, index) => (
        <div key={index} className="table-category-admin__cart">
          <div>
            <CardImg src={category.image} alt="Card image cap" />
            <CardBody>
              <CardTitle>{category.title}</CardTitle>
            </CardBody>
          </div>
          <div className="menu_links">
            <AiOutlineMore color="white" size={30} />
            <Action
              category={category}
              updateCategory={updateCategory}
              onDeleteCategory={onDeleteCategory}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Action(props) {
  const { category, updateCategory, onDeleteCategory } = props;
  return (
    <div className="actions">
      <label onClick={() => updateCategory(category)}>Editar</label>
      <label onClick={() => onDeleteCategory(category)}>Eliminar</label>
    </div>
  );
}
