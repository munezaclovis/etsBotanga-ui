import { Navigate, NonIndexRouteObject, Outlet } from "react-router-dom";
import AuthLayout from "./components/template/AuthLayout";
import Login from "./pages/authentication/login";
import Logout from "./pages/authentication/logout";
import Register from "./pages/authentication/register";
import Notfound from "./pages/errors/notfound";
import Dashboard from "./pages/home/dashboard";
import IngredientsCreate from "./pages/ingredients/IngredientsCreate";
import IngredientsDetails from "./pages/ingredients/IngredientsDetails";
import IngredientsIndex from "./pages/ingredients/IngredientsIndex";
import OrdersIndex from "./pages/orders/OrdersIndex";
import ProductCreate from "./pages/products/ProductCreate";
import ProductsDetails from "./pages/products/ProductsDetails";
import ProductsIndex from "./pages/products/ProductsIndex";
import RolesIndex from "./pages/roles/RolesIndex";
import UsersDetails from "./pages/users/UsersDetails";
import UsersIndex from "./pages/users/UsersIndex";
import RequireAuth from "./services/middlewares/requireAuth";

export interface IRouteObject extends NonIndexRouteObject {
    permission?: string;
    children?: IRouteObject[];
}

const router: Array<IRouteObject> = [
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
                        element: <Navigate to={"products"} replace={true} />,
                    },
                    {
                        path: "home",
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
                            {
                                path: "create",
                                element: <ProductCreate />,
                                permission: "product:create",
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
                            {
                                path: "create",
                                element: <IngredientsCreate />,
                                permission: "ingredient:create",
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
                                permission: "user:show",
                            },
                        ],
                    },
                    {
                        path: "roles",
                        element: <RolesIndex />,
                        permission: "role:show",
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

export default router;
