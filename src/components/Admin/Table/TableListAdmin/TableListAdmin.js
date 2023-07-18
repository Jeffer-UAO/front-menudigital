import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { AiOutlineSync } from "react-icons/ai";

import { TableAdmin } from "../index";
import "./TableListAdmin.scss";

export function TableListAdmin(props) {
  const { tables } = props;

  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    }
  }, [autoReload]);

  const onChageAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="table-list-admin">
      <div className="table-list-admin__header">
        <div className="table-list-admin__reload-toggle">
          <div>
            <i className="title">Sincronización Automática</i>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoReload}
              onChange={(data) => onChageAutoReload(data.target.checked)}
            />

            <span className="slider round"></span>
          </label>
        </div>
        <div>
          <i className="title">Sincronización Manual</i>
        </div>
        <div className="table-list-admin__btn_async">
          <AiOutlineSync size="25" color="red" onClick={onReload} />
        </div>
      </div>
      <div className="table-list-admin__orders">
        {map(tables, (table, index) => (
          <TableAdmin key={index} table={table} reload={reload} />
        ))}
      </div>
    </div>
  );
}
