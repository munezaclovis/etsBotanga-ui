import { createContext, FC, useState } from "react";
import {
    IAuthCredentials,
    IAuthErrors,
    IAuthErrorsResponse,
    ILoginResponse,
} from "../../models/auth/IAuth";
import IPageProps from "../../models/shared/IPageProps";
import { IUser } from "../../models/shared/user/IUser";
import useApi from "../../services/api/useApi";
import { AxiosError, AxiosResponse } from "axios";
import getAccessToken from "../../services/localstorage/getAccessToken";

interface IStateType {
    details?: IUser;
    tokens?: { access_token: string | undefined };
    errors?: IAuthErrors;
    loading: boolean;
    isLoggedIn: boolean;
}

interface AuthContextType {
    user: IStateType;
    login: (
        credentials: { username: string; password: string },
        callback: CallableFunction
    ) => void;
    register: (
        credentials: {
            name: string;
            username: string;
            password: string;
            password_confirmation: string;
            code: string;
        },
        callback: CallableFunction
    ) => void;
    loginWithToken: () => void;
    logout: () => void;
    resetErrors: () => void;
    setLoading: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

const AuthProvider: FC<IPageProps> = ({ children }) => {
    const [user, setUser] = useState<IStateType>({
        tokens: { access_token: undefined },
        isLoggedIn: false,
    } as IStateType);

    const somethingWentWrongError = (input: "login" | "register") => {
        setUser({
            errors: {
                message: "Something went wrong, try again later",
                for: input,
            },
            loading: false,
            isLoggedIn: false,
        } as IStateType);
    };

    const login = (
        credentials: { username: string; password: string },
        callback: CallableFunction
    ) => {
        const api = useApi();
        const { setToken } = getAccessToken();

        setLoading(true);

        api.post<IAuthCredentials, AxiosResponse<ILoginResponse>>(
            "login",
            credentials
        )
            .then((response) => {
                setToken(response.data.access_token);

                setUser({
                    tokens: { access_token: response.data.access_token },
                    details: {
                        id: response.data.user.id,
                        name: response.data.user.name,
                        username: response.data.user.username,
                        roles: response.data.user?.roles?.map((role) => {
                            return {
                                id: role?.id,
                                name: role?.name,
                                permissions: role?.permissions?.map((perm) => {
                                    return {
                                        id: perm.id,
                                        name: perm.name,
                                    };
                                }),
                            };
                        }),
                    },
                    loading: false,
                    isLoggedIn: true,
                } as IStateType);
                callback();
            })
            .catch((error: AxiosError<IAuthErrorsResponse>) => {
                if (error?.response?.status === 422) {
                    setUser({
                        errors: {
                            message: "The given data have failed validation",
                            fields: {
                                username:
                                    error?.response?.data?.errors?.username,
                                password:
                                    error?.response?.data?.errors?.password,
                            },
                            for: "login",
                        },
                        loading: false,
                        isLoggedIn: false,
                    } as IStateType);
                } else if (error?.response?.status === 401) {
                    setUser({
                        errors: {
                            message:
                                error?.response?.data?.message ??
                                "Login invalid. username/password incorrect",
                        },
                        loading: false,
                    } as IStateType);
                } else {
                    setLoading(true);
                    somethingWentWrongError("login");
                }
            });
    };
    const register = (
        credentials: {
            name: string;
            username: string;
            password: string;
            password_confirmation: string;
            code: string;
        },
        callback: CallableFunction
    ) => {
        const api = useApi();
        const { setToken } = getAccessToken();
        setLoading(true);

        api.post<IAuthCredentials, ILoginResponse>("register", credentials)
            .then((data) => {
                setToken(data.access_token);

                setUser({
                    tokens: { access_token: data.access_token },
                    details: {
                        id: data.user.id,
                        name: data.user.name,
                        username: data.user.username,
                        roles: data.user?.roles?.map((role) => {
                            return {
                                id: role?.id,
                                name: role?.name,
                                permissions: role?.permissions?.map((perm) => {
                                    return {
                                        id: perm.id,
                                        name: perm.name,
                                    };
                                }),
                            };
                        }),
                    },
                    loading: false,
                    isLoggedIn: true,
                } as IStateType);
                callback();
            })
            .catch((error: AxiosError<IAuthErrorsResponse>) => {
                if (error?.response?.status === 422) {
                    setUser({
                        errors: {
                            message: "The given data have failed validation",
                            fields: {
                                name: error?.response?.data?.errors?.name,
                                username:
                                    error?.response?.data?.errors?.username,
                                password:
                                    error?.response?.data?.errors?.password,
                                password_confirmation:
                                    error?.response?.data?.errors
                                        ?.password_confirmation,
                                code: error?.response?.data?.errors?.code,
                            },
                            for: "register",
                        },
                        loading: false,
                        isLoggedIn: false,
                    } as IStateType);
                } else {
                    somethingWentWrongError("register");
                }
            });
    };
    const logout = () => {
        const { setToken } = getAccessToken();
        const api = useApi();

        api.get("logout").catch((error) => {});

        setToken(null);
        setUser({ isLoggedIn: false } as IStateType);
    };
    const loginWithToken = () => {
        const api = useApi();
        const { token, setToken } = getAccessToken();

        api.get("/me")
            .then((response: AxiosResponse<IUser>) => {
                setUser({
                    tokens: { access_token: token },
                    details: {
                        id: response.data.id,
                        name: response.data.name,
                        username: response.data.username,
                        roles: response.data.roles?.map((role) => {
                            return {
                                id: role?.id,
                                name: role?.name,
                                permissions: role?.permissions?.map((perm) => {
                                    return {
                                        id: perm.id,
                                        name: perm.name,
                                    };
                                }),
                            };
                        }),
                    },
                    loading: false,
                    isLoggedIn: true,
                } as IStateType);
            })
            .catch((error) => {
                setUser({ isLoggedIn: false } as IStateType);
                setToken(null);
            });
    };

    const resetErrors = () => {
        setUser({ ...user, errors: undefined });
    };

    const setLoading = (status: boolean) => {
        setUser({ ...user, loading: status });
    };

    let value = {
        user,
        loginWithToken,
        login,
        register,
        logout,
        resetErrors,
        setLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
