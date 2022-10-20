import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../store/auth/context";

const Logout = () => {
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    logout();
    return <Navigate to="/" state={{ from: location.pathname }} />;
};

export default Logout;
