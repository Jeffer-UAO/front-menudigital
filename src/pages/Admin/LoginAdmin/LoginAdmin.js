import React from "react";
import "./LoginAdmin.scss";
import { LoginForm } from "../../../components/Admin";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin_content">
        <h1>Iniciar</h1>
        <LoginForm />
      </div>
    </div>
  );
}
