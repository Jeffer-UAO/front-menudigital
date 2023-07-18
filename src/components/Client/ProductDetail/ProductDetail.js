import React, { useState } from "react";
import { addProductCart } from "../../../api/cart";
import { useParams, useHistory } from "react-router-dom";
import {
  AddSaucesToProduct,
  AddSaucesToProductAdmin,
} from "../../../components/Admin";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks";
import {
  Button,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import "./ProductDetail.scss";

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export function ProductDetail(props) {
  const { product } = props;
  const history = useHistory();
  const { tableNumber } = useParams();
  const { addProduct } = useCart();
  const [sauce, setSauce] = useState([]);
  const [amount, setAmount] = useState(1);
  const [comment, setComment] = useState(null);
  // const addCart = (product) => {
  //   addProductCart(product.id);
  //    toast.success(`${product.title} Se añadió al carrito`);
  // };

  const dataOrder = {
    item: product.id,
    sauce,
    comment,
    amount,
  };

  const addCart = (dataOrder) => {
    addProduct(dataOrder);
    toast.success(`${product.title} Se añadió al carrito`);
    history.push(`/client/${tableNumber}/`);
    //   openCloseModal();
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

  //  const addSauce = (product) => {
  //  console.log(product);
  //  <AddSaucesToProduct />;
  // addProductCart(product.id);
  //  toast.success(`${product.title} Se añadió la salsa`);
  // };

  return (
    <div className="detail-product">
      <div className="title-price">
        <CardImg src={product.image} alt="Card image cap" />

        <div className="title-price__product">
          <CardTitle>{product.title}</CardTitle>
          <CardSubtitle>$ {formatNumber(product.price)}</CardSubtitle>
        </div>
      </div>

      <div className="description">
        {product.description}
        <div>
          <br />
          <div className="botones">
            <div>
              <AddSaucesToProductAdmin
                addSauce={addSauce}
                product={product.id}
              />
            </div>
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

          <Button block color="success" onClick={() => addCart(dataOrder)}>
            Enviar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
