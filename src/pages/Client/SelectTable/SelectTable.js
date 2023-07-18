import React, { useState, useEffect } from "react";
import { useTable, useClientTemp } from "../../../hooks";
import { addUserLocal, getUserLocal } from "../../../api/userClient";
import { FiArrowRight } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { SiJusteat } from "react-icons/si";
import { GiStorkDelivery } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { addTableCart } from "../../../api/cart";
import { Button, CardImg, Input } from "reactstrap";

import "./SelectTable.scss";

export function SelectTable(props) {
  const { history } = props;
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();
  const { setDataUser, addUserTemp, userTemp } = useClientTemp();

  getUserCar(userTemp);

  const addTableToCard = (tableNum) => {
    addTableCart(tableNum);
    history.push(`/client/${tableNum}/`);
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (!tableNum) {
      setError("Debes ingresar el numero de la mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) {
        addTableToCard(tableNum);
      } else {
        setError("La mesa no existe");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const userCar = await getUserLocal();

      if (userCar) {
        console.log(userCar);
        setDataUser(userCar);
      } else {
        await addUserTemp({ title: "Temporal" });
      }
    })();
  }, []);

  return (
    <div className="select-table">
      <div className="select-table__options">
        <div className="user">
          <span className="user__cod">
            Cliente # <p>{userTemp.id}</p>
          </span>
          <span onClick={() => history.push(`/login/`)}>
            <BiUserCircle size={35} />
          </span>
        </div>
        <div className="presentations">
          <CardImg
            src="https://blogs.uninter.edu.mx/ENDECS/wp-content/uploads/2020/07/Restaurante-15.jpg"
            alt="Card image cap"
          />
        </div>
        <div className="select-table__content">
          <h5>HOLA, QUE BUENO VERTE</h5>     
          <h5>Tu pedido es para ...</h5>

          <form onSubmit={onSubmit} className="form">
            <div className="btn-option-one">
              <div className="btn0 wear" onClick={() => addTableToCard(-1)}>
                <GoPackage size={40} />
                <h4>Llevar</h4>
              </div>

              <div className="btn0 delivery" onClick={() => addTableToCard(-2)}>
                <GiStorkDelivery size={40} />
                <h4>Domicilio</h4>
              </div>
            </div>

            <div className="btn0 pull " onClick={() => addTableToCard(-3)}>
              <SiJusteat size={40} />
              <h3>Recoger en restaurante</h3>
            </div>

            <div className="btn-table">
              <h3> Mesa No.</h3>
              <Input
                type="number"
                onChange={(data) => setTableNum(data.target.value)}
              />
              <Button type="submit">
                <FiArrowRight size={25} />
              </Button>
            </div>
            <p className="select-table__content-error">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

function getUserCar(data) {
  if (data) {
    addUserLocal(data);
  }
}
