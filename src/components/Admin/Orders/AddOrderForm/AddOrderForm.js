import React, { useEffect } from "react";
import { useProduct } from "../../../../hooks";
import { Form, Button, Input, InputGroup, InputGroupText } from "reactstrap";

import "./AddOrderForm.scss";

export function AddOrderForm(props) {
  const { idTable, openCloseModal } = props;

  const { products, getProducts } = useProduct();

  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Form className="add-order-form">
      <InputGroup className="input">
        <InputGroupText>PRODUCTOS:</InputGroupText>
        <Input
          id="productos"
          name="productos"
          placeholder="Productos"
          //value={formik.values.price}
          //onChange={formik.handleChange}
          //error={formik.errors.price}
        />
      </InputGroup>

      <Button type="submit" active color="success" block>
        Guardar
      </Button>
    </Form>
  );
}
