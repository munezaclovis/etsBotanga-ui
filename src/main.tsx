import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Compose from "./Compose";
import AuthProvider from "./store/auth/context";
import CartProvider from "./store/cart/context";
import ThemeProvider from "./store/theme/context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/site.min.css";
import "./assets/css/custom.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Compose components={[React.StrictMode, BrowserRouter, AuthProvider, ThemeProvider, CartProvider]}>
        <App />
    </Compose>
);
