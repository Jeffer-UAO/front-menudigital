import React, { useEffect, useState } from "react";
import { Button, Input, FormGroup } from "reactstrap";

import Select from "react-select";
import { map } from "lodash";

import "./AddSalesman.scss";

export function AddSalesman(props) {
  const { salesman, setDataOrder } = props;
  const [salesmanFormat, setSalesmanFormat] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    setSalesmanFormat(formatDropdowData(salesman));
  }, [salesman]);

  return (
    <>
      <FormGroup>
        Nombre:
        <Select
          placeholder="Sin Vendedor"
          options={salesmanFormat}
          onChange={(e) => setSearchStr(e.value)}
        />
      </FormGroup>
      <div className="data-send">
       <h6>Datos de envío</h6> 
        <Input id="title" name="title" placeholder="Nombre" />
        <Input id="title" name="title" placeholder="Dirección" />
        <Input id="title" name="title" placeholder="Barrio" />
        <Input id="title" name="title" placeholder="Teléfono" />
        <Input id="title" name="title" placeholder="Forma de pago" />
        <div className="btn-send" onClick={() => setDataOrder(searchStr)}>
          Guardar
        </div>
      </div>
    </>
  );
}

function formatDropdowData(data) {
  return map(data, (item) => ({
    value: item.id,
    label: item.description,
  }));
}
