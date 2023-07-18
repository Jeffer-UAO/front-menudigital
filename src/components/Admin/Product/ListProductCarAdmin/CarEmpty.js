import React from "react";
import { Link } from "react-router-dom";

import { FaOpencart } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

import "./CarEmpty.scss";

export function CarEmpty() {
  return (
    <div className="car-empty containerBody">
      <FaOpencart size={300} color={"#ffffff63"} />
      <p>Tu carrito esta vacio. </p>
    </div>
  );
}
