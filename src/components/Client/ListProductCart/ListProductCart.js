import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { map, forEach } from "lodash";
import { useParams, useHistory } from "react-router-dom";
import { useOrder, useTable } from "../../../hooks";
import { removeProductCardApi, cleanProductCartApi } from "../../../api/cart";

import "./ListProductCart.scss";

export function ListProductCart(props) {
  const [total, setTotal] = useState(0);
  const { products, onReloadCard } = props;
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const history = useHistory();

  const removeProduct = (index) => {
    removeProductCardApi(index);
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
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <h5>{product.title}</h5>
            <h5>$ {product.price}</h5>
          </div>

          <div className="btn-close" onClick={() => removeProduct(index)}></div>
        </div>
      ))}

      <Button block onClick={createOrder}>
        Realizar pedido !! ($ {total})
      </Button>
    </div>
  );
}
