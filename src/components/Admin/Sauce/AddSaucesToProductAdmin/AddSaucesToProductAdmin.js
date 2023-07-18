import React, { useEffect, useState } from "react";
import { useSauces } from "../../../../hooks";
import { map } from "lodash";

import { GiAbstract030 } from "react-icons/gi";
import { GiAbstract031 } from "react-icons/gi";

import "./AddSaucesToProductAdmin.scss";

export function AddSaucesToProductAdmin(props) {
  const { addSauce, product } = props;

  // const { getSaucesActive, sauces } = useSauces();
  const { getSaucesToProductId, saucesMini } = useSauces();
  const [saucesClone, setSaucesClone] = useState([]);
  const [checkSauces, setCheckSauces] = useState(false);

  const onChangeStateSauce = () => setCheckSauces((prev) => !prev);

  useEffect(() => {
    getSaucesToProductId(product);
  }, []);

  useEffect(() => {
    const result = Object.assign([{}], saucesMini);
    addSauce(result);
    setSaucesClone(result);
  }, [saucesMini]);

  const updateSauce = (sauce) => {
    let index = saucesClone.indexOf(sauce);

    if (index > -1) {
      saucesClone.splice(index, 1);
    } else {
      saucesClone.push(sauce);
    }
    addSauce(saucesClone);
  };

  return (
    <>
      {(saucesMini != "") ? (
        <div className="add-sauce-to-product">
          <div className="add-sauce-title" onClick={onChangeStateSauce}>
            <h6>Elija las salsas</h6>

         {/**
          * 
          * <div className="sauce-options">
              {checkSauces ? (
                <label>
                  Todas <GiAbstract030 size={16} color="yellow" />
                </label>
              ) : (
                <label>
                  Ninguna <GiAbstract031 size={16} color="red" />
                </label>
              )}
            </div>

          */}   
          
          </div>
          <div className="add-sauce-to-product__sauces">
            {map(saucesMini, (sauce, index) => (
              <div key={index} className="sauce">
                {sauce.description}
                <div className="toggle-button-cover">
                  <div className="button-cover">
                    <div className="button r" id="button-3">
                      <input
                        onClick={() => updateSauce(sauce)}
                        type="checkbox"
                        className="checkbox"
                        name="sauce"
                      />
                      <div className="knobs"></div>
                      <div className="layer"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
