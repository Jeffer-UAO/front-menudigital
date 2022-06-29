import React from "react";
import { map } from "lodash";
import { useLocation, useHistory } from "react-router-dom";

import "./ListCategories.scss";

import { Card, CardBody, CardGroup, CardImg, CardTitle } from "reactstrap";

export function ListCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const history = useHistory();

  const goToCategory = (id) => {   
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          key={category.id}
          className="list-categories-client__category"
          onClick={() => goToCategory(category.id)}
        >
          <CardGroup>
            <Card>
              <CardImg alt="Card image cap" src={category.image} />
              <CardBody>
                <CardTitle>{category.title}</CardTitle>
              </CardBody>
            </Card>
          </CardGroup>
        </div>
      ))}
    </div>
  );
}
