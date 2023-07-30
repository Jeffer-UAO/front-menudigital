import React, { useEffect, useState } from "react";
import { useSauces } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from "lodash";
import { Button } from "reactstrap";
import "./SauceToPorduct.scss";
//import { AddSaucesToProduct } from '../AddSaucesToProduct';

export function SauceToProduct(props) {
  const {
    sauces,
    saucesOldId,
    saucesIndex,
    idProduct,
    saucesMini,
    createSaucesToProduct,
    openCloseModal,
    addSaucesToProduct,
    deleteSaucesToProduct,
  } = props;

  const [saucesClone, setSaucesClone] = useState(saucesOldId);
  const [indexSauce, setIndexSauce] = useState(saucesIndex);
  const { getSauceToProduct } = useSauces();
  //  const [sauceNew, setSauceNew] = useState(saucesOldId);

  const updateSaucesToProduct = async (sauce) => {
    let index = indexSauce.indexOf(sauce.id);

    if (index > -1) {
      saucesClone.splice(index, 1);
      indexSauce.splice(index, 1);
      if (idProduct > 0) {
        const result = await getSauceToProduct(idProduct, sauce.id);
        await deleteSaucesToProduct(result[0].id);
      }
    } else {
      indexSauce.push(sauce.id);
      saucesClone.push(sauce);
      if (idProduct > 0) {
        await addSaucesToProduct(idProduct, sauce.id, sauce.description);
      }
    }
  };

  return (
    <div>
      <div className="add-sauce-to-product__sauces">
        {map(sauces, (sauce, index) => (
          <div key={index} className="sauce">
            {sauce.description}
            <div>
              <div>
                <div className="button r" id="button-4">
                  <input
                    onClick={() => updateSaucesToProduct(sauce)}
                    type="checkbox"
                    className="checkbox"
                    name={sauce.id}
                    defaultChecked={
                      saucesOldId.find((e) => e.sauces === sauce.id) || false
                    }
                  />

                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        active
        color="success"
        block
        onClick={() => createSaucesToProduct(saucesClone)}
      >
        Guardar
      </Button>
    </div>
  );
}

async function SaucesToProduct(idProduct, allSauces, addSaucesToProduct) {
  for await (const sauce of allSauces) {
    await addSaucesToProduct(idProduct, sauce);
  }
}
