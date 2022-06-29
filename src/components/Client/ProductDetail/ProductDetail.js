import React from "react";
import { addProductCart } from "../../../api/cart";
import { toast } from "react-toastify";
import {
  Button,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import "./ProductDetail.scss";

export function ProductDetail(props) {
  const { product } = props;

  const addCart = (product, pp) => {
    console.log(pp);
    addProductCart(product.id, pp);
    toast.success(`${product.title} se añadió al carrito`);
  };

  return (
    <div className="detail-product">
      <CardImg src={product.image} alt="Card image cap" />
      <CardBody>
        <CardTitle>{product.title}</CardTitle>
        <CardSubtitle>$ {product.price}</CardSubtitle>
      </CardBody>
      <CardText>
        <span>DESCRIPCIÓN:</span> <br />
        {product.description}
      </CardText>
      <Button block color="primary" onClick={() => addCart(product, "hola")}>
        Adiccionar al Carrito
      </Button>
    </div>
  );
}
