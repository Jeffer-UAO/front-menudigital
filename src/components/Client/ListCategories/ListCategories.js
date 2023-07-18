import React from "react";
import { map } from "lodash";
import { useLocation, useHistory } from "react-router-dom";

import "./ListCategories.scss";

import { CardBody, CardImg, CardTitle } from "reactstrap";

export function ListCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const history = useHistory();

  const goToCategory = (id) => {
    history.push(`${location.pathname}${id}`);
  };

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="list-categories-client__category"
          onClick={() => goToCategory(category.id)}
        >
          <CardImg alt="Card image cap" src={category.image} />

          <CardTitle>{category.title}</CardTitle>
        </div>
      ))}
    </div>
  );
}
