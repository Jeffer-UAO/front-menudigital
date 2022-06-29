import React from "react";
import { Button, CardImg } from "reactstrap";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { map } from "lodash";

import "./TableUsers.scss";

export function TableUsers(props) {
  const { users, updateUser, onDeleteUser } = props;
  return (
    <div className="table-users-admin">
      {map(users, (user, index) => (
        <div className="cart" key={index}>
          <div className="content">
            <span></span>
            <div className="img">
              <CardImg
                src="https://dqv3sy2b96qdv.cloudfront.net/media/W1siZiIsIjIwMTUvMDkvMDQvMTcvMzYvMDIvMzczL25vX3VzZXJfaW1nLnBuZyJdLFsicCIsInRodW1iIiwiNTExeDUxMSsxMSsxMiJdLFsicCIsInRodW1iIiwiMjAweDIwMCJdXQ/15b37310/no-user-img.png"
                alt="Card image cap"
              />
            </div>
            <h4>{user.username}</h4>
            <h6>
              {user.first_name} {user.last_name}
            </h6>
            <h6>{user.email}</h6>
            <h6>{user.is_staff ? <p>Administrador</p> : <p>Invitado</p>}</h6>
            <h6>{user.is_active ? <p>Activo</p> : <p>Inactivo</p>}</h6>
          </div>
          <div className="links">
            <a href="#">
              <MdDeleteForever size={38} color="#ff0a0aaa" />
            </a>
            <a href="#">
              <AiFillEdit size={38} color="#ff0a0aaa" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function Action(props) {
  const { user, updateUser, onDeleteUser } = props;
  return (
    <>
      <td className="actions-user-admin">
        <Button onClick={() => updateUser(user)}>E</Button>
      </td>
      <td>
        <Button onClick={() => onDeleteUser(user)}>X</Button>
      </td>
    </>
  );
}
