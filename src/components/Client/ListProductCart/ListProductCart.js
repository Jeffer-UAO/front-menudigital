import React, { useState, useEffect } from "react";
import { map, forEach } from "lodash";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { useOrder, useTable, useSaucesOrder, useCart } from "../../../hooks";
import { removeProductCardApi, cleanProductCartApi } from "../../../api/cart";
import { getUserLocal } from "../../../api/userClient";


import { AiOutlineDelete } from "react-icons/ai";

import "./ListProductCart.scss";

function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export function ListProductCart(props) { 
  const [total, setTotal] = useState(0);
  const [idUser, setIdUser] = useState(null);
  const { products, onReloadCard } = props;
  const { addOrderToTable, addOrderEnToTable } = useOrder();
  const { addSaucesOrder } = useSaucesOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const history = useHistory();

  const removeProduct = (index) => {
    removeProductCardApi(index);
    onReloadCard();
  };

  useEffect(() => {
    let totalTemp = 0;
    const userCar = getUserLocal();

    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setIdUser(userCar.id);
    setTotal(totalTemp);
  }, [products]);




  const createOrder = async () => {
    try {
      const response = await addOrderEnToTable();
      const tableData = await getTableByNumber(tableNumber);  
      const idTable = tableData[0].id;
;
      if(response.id > 0){

        const sall = {
          salesman: "",
          idTable,
          number: response.id,
          userId: "",
        };

        for (var i = 0; i < products.length; i++) {
          console.log(products[i]);
          const resp = await addOrderToTable(Object.assign(products[i], sall));
       
    
     // for (var f = 0; f < products[i].sauce.length; f++) {           
   ///     await addSaucesOrder(resp.id, products[i].sauce[f].id);
   //   }
   
          
        }
      }else{
        console.log("Error en modulo pedido CardAdmin");
      }  
      
      
    } catch (error) {
//      setError(error);
    }
    cleanProductCartApi(); 
    history.push(`/client/${tableNumber}/`);
  };


//  const createOrder = async () => {
//    const tableData = await getTableByNumber(tableNumber);  
//    const idTable = tableData[0].id;

//    for await (const product of products) {
//      await addOrderToTable(idTable, product.id, idUser);
//    }
//    cleanProductCartApi();
//    history.push(`/client/${tableNumber}/orders`);
//  };

  

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <img src={product.image} alt="Card image cap" />
          <span>
            <h3>{product.title}</h3>
            <h6> $ {formatNumber(product.price)}</h6>
          </span>

          <span
            className="list-product-cart__close"
            onClick={() => removeProduct(index)}
          >
            <AiOutlineDelete size="35" />
          </span>
        </div>
      ))}

      <Button color="success" block onClick={createOrder}>
        <h5>Enviar pedido: Total $ {formatNumber(total)}</h5>
      </Button>
    </div>
  );
}
