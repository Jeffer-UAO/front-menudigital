import React from "react";
import { map } from "lodash";
import { useLocation, useHistory } from "react-router-dom";

import { CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

import "./ListProducts.scss";

export function ListProducts(props) {
  const { products } = props;
  const location = useLocation();
  const history = useHistory();

  const goToProductDetail = (id) => {
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <div className="list-products-client">
      {map(products, (product) => (
        <div
          key={product.id}
          className="list-products-client__product"
          onClick={() => goToProductDetail(product.id)}
        >
          <CardImg src={product.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{product.title}</CardTitle>
            <CardSubtitle>$ {product.price}</CardSubtitle>
          </CardBody>
        </div>
      ))}
    </div>
  );
}
