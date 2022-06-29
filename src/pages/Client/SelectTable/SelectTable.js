import React, { useState } from "react";
import { useTable } from "../../../hooks";

import { Button, Input } from "reactstrap";

import "./SelectTable.scss";

export function SelectTable(props) {
  const { history } = props;
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (!tableNum) {
      setError("No se ha imgresado el numero de la mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) {
        history.push(`/client/${tableNum}`);
      } else {
        setError("La mesa no existe");
      }
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a Carta VIP</h1>
        <h2>Introduce el numero de la mesa</h2>

        <form onSubmit={onSubmit}>
          <Input
            placeholder="Solo numero"
            type="number"
            onChange={(data) => setTableNum(data.target.value)}
          />
          <Button block type="submit">
            Entrar
          </Button>
          <p className="select-table__content-error">{error}</p>
        </form>
      </div>
    </div>
  );
}
