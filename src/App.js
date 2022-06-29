import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/index.scss";
import { ToastContainer } from "react-toastify";
import { Navigation } from "./routes/Navigation";
import { AuthProvider, CartProvider } from "./context";
import {} from "./app.scss";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navigation />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </CartProvider>
    </AuthProvider>
  );
}
