import React, { useState, useEffect } from "react";
import { CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { map } from "lodash";
import { useCart } from "../../../../hooks";
import { AiOutlineMore } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import "./TableProductAdmin.scss";

export function TableProductAdmin(props) {
  const { products, updateProduct, deleteProduct, getSaucesAct } =
    props;

   
  const [searchStr, setSearchStr] = useState("");
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    setNewProducts(products);
  }, []);

  const handleChange = (e) => {
    setSearchStr(e.target.value);
    filter(e.target.value);
  };

  const filter = (search) => {
    const result = products.filter((element) => {
      if (
        element.title.toString().toLowerCase().includes(search.toLowerCase()) ||
        element.category_data.title
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return element;
      }
    });
    setNewProducts(result);
  };

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  return (
    <>
      <Search
        setSearchStr={setSearchStr}
        // searchStr={searchStr}
        handleChange={handleChange}
      />
      <div className="table-product-admin">
        {newProducts &&
          map(newProducts, (product, index) => (
            <div className="cart" key={index}>
              <div>
                <CardImg src={product.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{product.title}</CardTitle>
                  <CardSubtitle>$ {formatNumber(product.price)}</CardSubtitle>
                </CardBody>
              </div>

              <div className="menu_links">
                <AiOutlineMore color="white" size={30} />
                <Action
                  product={product}
                  updateProduct={updateProduct}
                  deleteProduct={deleteProduct}
                  getSaucesAct={getSaucesAct}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

function Action(props) {
  const { product, updateProduct, deleteProduct } = props;
  const { addProduct } = useCart();
  return (
    <div className="actions">
      <label onClick={() => addProduct(product.id)}></label>
      <hr />
      <label onClick={() => updateProduct(product)}>Editar</label>
      <label onClick={() => deleteProduct(product)}>Eliminar</label>
    </div>
  );
}

function Search(props) {
  const { handleChange } = props;
  // setSearchStr(searchStr);
  const clx = "white";
  return (
    <div className="search">
      <input
        id="search-page"
        //value={searchStr}
        onChange={handleChange}
        placeholder={"Busqueda"}
      />
      <BsSearch color={clx} />
    </div>
  );
}
