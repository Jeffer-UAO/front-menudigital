import React, { useEffect, useState } from "react";
import { Button, Input, FormGroup,  Spinner } from "reactstrap";

import Select from "react-select";
import { map } from "lodash";

import "./AddSalesman.scss";

export function AddSalesman(props) {
  const { salesman, setDataOrder } = props;
  const [salesmanFormat, setSalesmanFormat] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);    

  console.log(loading);

  useEffect(() => {
    setSalesmanFormat(formatDropdowData(salesman));
  }, [salesman]);

  const dataOrder = () =>{
    setLoading(true);
    setDataOrder(searchStr)
  }

  return (
    <>
      <FormGroup>
        Nombre:
        <Select
          placeholder="Sin Vendedor"
          options={salesmanFormat}
          isSearchable={false}
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
        {loading ? (
          <Button disabled block>
          <Spinner>Cargando...</Spinner>
        </Button>
      ) : (
        <Button type="submit" color="success" block onClick={() => dataOrder()}>
          GUARDAR
        </Button>
        )}
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
