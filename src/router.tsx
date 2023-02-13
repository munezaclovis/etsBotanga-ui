import Notfound from "./pages/errors/notfound";
import { Navigate, NonIndexRouteObject, Outlet } from "react-router-dom";
import Dashboard from "./pages/home/dashboard";
import Login from "./pages/authentication/login";
import Logout from "./pages/authentication/logout";
import RequireAuth from "./services/middlewares/requireAuth";
import Register from "./pages/authentication/register";
import ProductsIndex from "./pages/products/ProductsIndex";
import UsersIndex from "./pages/users/UsersIndex";
import AuthLayout from "./components/template/AuthLayout";
import RolesIndex from "./pages/roles/RolesIndex";
import ProductsDetails from "./pages/products/ProductsDetails";
import IngredientsIndex from "./pages/ingredients/IngredientsIndex";
import IngredientsDetails from "./pages/ingredients/IngredientsDetails";
import UsersDetails from "./pages/users/UsersDetails";
import OrdersIndex from "./pages/orders/OrdersIndex";
import ProductCreate from "./pages/products/ProductCreate";
import IngredientsCreate from "./pages/ingredients/IngredientsCreate";

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
