import React, { useContext } from "react";
import { matchRoutes, useLocation, useResolvedPath, useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "../../components/template/layout";
import settings from "../../data/settings";
import routes, { IRouteObject } from "../../routes";
import { AuthContext } from "../../store/auth/context";

const RequireAuth = () => {
    const location = useLocation();
    const { user, loginWithToken } = useContext(AuthContext);

    if (!localStorage.getItem(settings.access_token_name) && !user?.isLoggedIn) {
        return <Navigate to="login" state={{ from: location.pathname }} replace />;
    }

    if (!user.isLoggedIn) {
        loginWithToken();
    }

    if (user.details?.roles?.at(0)?.name !== "super-admin") {
        const routeMatches = matchRoutes(routes, location);
        const currentRouteObj = routeMatches?.find((x) => x.pathname === location.pathname);

        if (
            (currentRouteObj?.route as IRouteObject).permission !== "" &&
            (currentRouteObj?.route as IRouteObject).permission !== undefined
        ) {
            if (
                !user.details?.roles
                    ?.at(0)
                    ?.permissions?.find((x) => x.name === (currentRouteObj?.route as IRouteObject).permission)
            ) {
                if (user.isLoggedIn) {
                    return <Navigate to="/" state={{ from: location.pathname }} replace />;
                }
            }
        }
    }
    return <Layout />;
};

export default RequireAuth;
