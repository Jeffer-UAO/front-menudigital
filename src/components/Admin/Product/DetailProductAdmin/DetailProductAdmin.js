import React, { useState } from "react";
//import { addProductCart } from "../../../../api/cart";
import { useCart } from "../../../../hooks";
import { AddSaucesToProductAdmin } from "../../../../components/Admin";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import { AiOutlineSync } from "react-icons/ai";
import "./DetailProductAdmin.scss";

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export function DetailProductAdmin(props) {
  const { addProduct } = useCart();
  const [amount, setAmount] = useState(1);
  const [comment, setComment] = useState(null);
  const [sauce, setSauce] = useState([]);
  const { product, openCloseModal } = props;

  const dataOrder = {
    item: product.id,
    sauce,
    comment,
    amount,
  };

  const addCart = (dataOrder) => {
    addProduct(dataOrder);
    toast.success(`${product.title} Se añadió al carrito`);
    openCloseModal();
  };

  const addSauce = (sauce) => {
    setSauce(sauce);
  };

  const updateCant = (x) => {
    const cant = amount + x;
    if (cant > 0 && cant < 100) {
      setAmount(amount + x);
    }
  };

  return (
    <>
      <div className="admin-detail-product">
        <div className="mod-content">
          <div className="list">
            <Card>
              <CardImg src={product.image} alt="Card image cap" />

              <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <CardSubtitle>$ {formatNumber(product.price)}</CardSubtitle>
                <CardText>{product.description}</CardText>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="botones">
          <AddSaucesToProductAdmin addSauce={addSauce} product={product.id} />
          <div className="price-init__cant">
            <label>CANTIDAD</label>
            <div className="drive-cant">
              <label onClick={() => updateCant(-1)}>-</label>
              <input
                type="number"
                max={9}
                min={1}
                readOnly
                //onChange={(e) => setCant(e.target.value)}
                value={amount}
              />

              <label onClick={() => updateCant(1)}>+</label>
            </div>
          </div>
          <div className="add-sauce-to-product__comment">
            <h6>Comentario Adicional:</h6>
            <textarea
              name="comentario"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <Button
        block
        color="success"
        className="btn-send"
        onClick={() => addCart(dataOrder)}
      >
        Agregar al Carrito
      </Button>
    </>
  );
}
