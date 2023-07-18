import React, { useEffect } from "react";
import { useCategory } from "../../../../hooks";
import { ListCategoryAdmin } from "../../../../components/Admin";
import { Form } from "reactstrap";

import "./AddOrderForm.scss";

export function AddOrderForm() {
  const { categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Form className="add-order-form">
      <div></div>
      <ListCategoryAdmin categories={categories} />
    </Form>
  );
}
