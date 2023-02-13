import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Compose from "./Compose";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/auth/context";
import CartProvider from "./store/cart/context";
import ThemeProvider from "./store/theme/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/css/site.min.css";
import "./assets/css/custom.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Compose
        components={[
            React.StrictMode,
            BrowserRouter,
            AuthProvider,
            CartProvider,
            ThemeProvider,
        ]}
    >
        <App />
    </Compose>
);
