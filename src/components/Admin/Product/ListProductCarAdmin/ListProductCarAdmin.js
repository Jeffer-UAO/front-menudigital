import React, { useState, useEffect } from "react";
import { map, forEach } from "lodash";
import { useParams, useHistory } from "react-router-dom";
import { useOrder, useTable, useCart } from "../../../../hooks";

import {
  removeProductCardApi,
  cleanProductCartApi,
} from "../../../../api/cart";

import { CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinusSm } from "react-icons/hi";
import { MdAdd } from "react-icons/md";

import "./ListProductCarAdmin.scss";

export function ListProductCarAdmin(props) {
  const [total, setTotal] = useState(0);
  const { products, onReloadCard } = props;
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { deleteAllProducts, deleteProduct } = useCart();
  const { tableNumber } = useParams();
  const history = useHistory();

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  const removeProduct = (index) => {
    deleteProduct(index);
    onReloadCard();
  };

  const removeProductAll = (index) => {
    deleteAllProducts();
    onReloadCard();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;

    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }
    cleanProductCartApi();
    history.push(`/client/${tableNumber}/orders`);
  };

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });

    setTotal(totalTemp);
  }, [products]);

  return (
    <>
      <div className="list-product-car-admin containerBody">
        {map(products, (product, index) => (
          <div key={index} className="list-product-car-admin__product">
            <div className="car-product">
              <CardImg src={product.image} alt="Card image cap" />

              <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <CardSubtitle>$ {formatNumber(product.price)}</CardSubtitle>
                {/**
                <div className="drive-cant">
                  <HiMinusSm size={30} color="white" />
                  <input type="number" max={9} min={1} />
                  <MdAdd size={30} color="white" />
                </div>
                */}

                <div
                  className="btn-delete-product-car"
                  onClick={() => removeProduct(index)}
                >
                  <AiOutlineDelete size={20} />
                  <span>Eliminar</span>
                </div>
              </CardBody>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-content">
        <h5 className="btn-send" onClick={removeProductAll}>
          Eliminar todo
        </h5>
        <h5 className="btn-send" onClick={createOrder}>
          Enviar pedido por: $ {formatNumber(total)}
        </h5>
      </div>
    </>
  );
}
