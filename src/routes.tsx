import Notfound from "./components/pages/errors/notfound";
import { Outlet, RouteObject } from "react-router-dom";
import Dashboard from "./components/pages/home/dashboard";
import Login from "./components/pages/authentication/login";
import Logout from "./components/pages/authentication/logout";
import RequireAuth from "./services/middlewares/requireAuth";
import Register from "./components/pages/authentication/register";
import ProductsIndex from "./components/pages/products/ProductsIndex";
import UsersIndex from "./components/pages/users/UsersIndex";
import AuthLayout from "./components/template/AuthLayout";
import RolesIndex from "./components/pages/roles/RolesIndex";
import ProductsDetails from "./components/pages/products/ProductsDetails";
import IngredientsIndex from "./components/pages/ingredients/IngredientsIndex";
import IngredientsDetails from "./components/pages/ingredients/IngredientsDetails";
import UsersDetails from "./components/pages/users/UsersDetails";
import OrdersIndex from "./components/pages/orders/OrdersIndex";

export interface IRouteObject extends RouteObject {
    permission?: string;
    children?: IRouteObject[];
}
const routes: Array<IRouteObject> = [
    {
        path: "",
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <RequireAuth />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "products",
                        element: <Outlet />,
                        children: [
                            {
                                path: "",
                                element: <ProductsIndex />,
                                permission: "product:show",
                            },
                            {
                                path: ":id",
                                element: <ProductsDetails />,
                                permission: "product:show",
                            },
                        ],
                    },
                    {
                        path: "ingredients",
                        element: <Outlet />,
                        children: [
                            {
                                path: "",
                                element: <IngredientsIndex />,
                                permission: "ingredient:show",
                            },
                            {
                                path: ":id",
                                element: <IngredientsDetails />,
                                permission: "ingredient:show",
                            },
                        ],
                    },
                    {
                        path: "orders",
                        element: <Outlet />,
                        children: [
                            {
                                path: "",
                                element: <OrdersIndex />,
                                permission: "order:show",
                            },
                        ],
                    },
                    {
                        path: "users",
                        element: <Outlet />,
                        children: [
                            {
                                path: "",
                                element: <UsersIndex />,
                                permission: "user:show",
                            },
                            {
                                path: ":id",
                                element: <UsersDetails />,
                            },
                        ],
                    },
                    {
                        path: "roles",
                        element: <RolesIndex />,
                        permission: "role:show",
                    },
                    {
                        path: "test",
                        element: <>Test Route YOOOOOOOOO</>,
                        permission: "test:show",
                    },
                ],
            },
            {
                path: "login",
                element: <AuthLayout />,
                children: [{ path: "", element: <Login /> }],
            },
            {
                path: "register",
                element: <AuthLayout />,
                children: [{ path: "", element: <Register /> }],
            },
            {
                path: "logout",
                element: <Logout />,
            },
            {
                path: "404",
                element: <Notfound />,
            },
            {
                path: "*",
                element: <Notfound />,
            },
        ],
    },
];

export default routes;
