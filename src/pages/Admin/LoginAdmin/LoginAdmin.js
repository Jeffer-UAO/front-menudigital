import React from "react";
import "./LoginAdmin.scss";
import { LoginForm } from "../../../components/Admin";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin_content">
        <h1>Estamos en el Login del admin</h1>
        <LoginForm />
      </div>
    </div>
  );
}
