import React, { useState } from "react";
import { map } from "lodash";
import { useProduct } from "../../../../hooks";
import { ListProduct } from "../../Product";

import "./ListCategoryAdmin.scss";

import { CardBody, CardImg, CardTitle } from "reactstrap";
import { ModalBasic } from "../../../Common/ModalBasic";

export function ListCategoryAdmin(props) {
  const [showModal, setShowModal] = useState(false);
  const [nameCategory, setNameCategory] = useState(null);
  const { products, getProductsByCategory } = useProduct();
  const { categories } = props;

  const goToProduct = async (category) => {
    await getProductsByCategory(category.id);
    setNameCategory(category.title);
    openCloseModal();
  };

  const openCloseModal = () => setShowModal((prev) => !prev);

  return (
    <div className="list-categories-client">
      {map(categories, (category, index) => (
        <div
          key={index}
          className="list-categories-client__category"
          onClick={() => goToProduct(category)}
        >
          <CardImg alt="Card image cap" src={category.image} />
          <CardBody>
            <CardTitle>{category.title}</CardTitle>
          </CardBody>
        </div>
      ))}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={nameCategory}
        size="lg"
      >
        <ListProduct
          products={products}
          openCloseModal={openCloseModal}
        //  onReloadOrders={onReloadOrders}
        />
      </ModalBasic>
    </div>
  );
}
