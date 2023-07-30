import React from "react";
import { CardImg } from "reactstrap";
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
            <h4>{user.first_name} {user.last_name}</h4>
            <div className="img">
              <CardImg
                src="https://dqv3sy2b96qdv.cloudfront.net/media/W1siZiIsIjIwMTUvMDkvMDQvMTcvMzYvMDIvMzczL25vX3VzZXJfaW1nLnBuZyJdLFsicCIsInRodW1iIiwiNTExeDUxMSsxMSsxMiJdLFsicCIsInRodW1iIiwiMjAweDIwMCJdXQ/15b37310/no-user-img.png"
                alt="Card image cap"
              />
            </div>
           
            <h6>{user.email}</h6>
            <h6>{user.is_staff ? <p>Administrador</p> : <p>Invitado</p>}</h6>
            <h6>{user.is_active ? <p>Activo</p> : <p>Inactivo</p>}</h6>
          </div>
          <div className="links">
            <a onClick={() => onDeleteUser(user)}>
              <MdDeleteForever size={30} color="yellow" />
            </a>
            <a onClick={() => updateUser(user)}>
              <AiFillEdit size={30} color="yellow" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
