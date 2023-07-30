import React, { useState } from "react";
import { map } from "lodash";
import { ModalBasic } from "../../../Common/ModalBasic";
import { DetailProductAdmin } from "../../Product";

import { CardBody, Card, CardImg, CardSubtitle } from "reactstrap";

import "./ListProduct.scss";

export function ListProduct(props) {
  const [showModal, setShowModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const { products } = props;

  const getProductDetail = (id) => {
    const productDetail = products.find((item) => {
      return item.id === id;
    });
    setProductDetail(productDetail);
    openCloseModal();
  };

  //

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  const openCloseModal = () => setShowModal((prev) => !prev);

  return (
    <div className="admin-product">
      {map(products, (product) => (
        <div
          key={product.id}
          className="list"
          onClick={() => getProductDetail(product.id)}
        >
          <Card>
          <CardImg src={product.image} alt="Card image cap" />
          <CardBody>{product.title}</CardBody>
          <CardSubtitle>$ {formatNumber(product.price)}</CardSubtitle>

          </Card>
        </div>
      ))}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Detalle del Producto"
        size="lg"
      >
        <DetailProductAdmin
          product={productDetail}
          openCloseModal={openCloseModal}
          // onReloadOrders={onReloadOrders}
        />
      </ModalBasic>
    </div>
  );
}
