import React, { useState, useEffect } from "react";
import { map, forEach } from "lodash";

import { Button, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";

import "./ListProductCarAdmin.scss";

export function ListProductCarAdmin(props) {
  const [total, setTotal] = useState(0);
  const { products, addSalesman, removeProduct, removeProductAll } = props;

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price * product.amount);
    });

    setTotal(totalTemp);
  }, [products]);

  return (
    <>
      <div className="list-product-car">
        {map(products, (product, index) => (
          <div key={index} className="list-product-car__product">
            <div>
              <CardImg src={product.image} alt="Empty" />
            </div>

            <span className="card-body">
              <CardTitle>{product.title}</CardTitle>
              <CardSubtitle>
                $ {formatNumber(product.price * product.amount)}
              </CardSubtitle>
              Cantidad {product.amount}
            </span>

            <span
              className="list-product-cart__close"
              onClick={() => removeProduct(index)}
            >
              <AiOutlineDelete size="25" />
            </span>
          </div>
        ))}
      </div>
      <div className="btn-content">
        
        <Button color="success" className="btn-send" onClick={() => addSalesman()}>
          Enviar pedido por: $ {formatNumber(total)}
        </Button>
        <div className="btn-send delete" onClick={removeProductAll}>
          Eliminar todo
        </div>
      </div>
    </>
  );
}
