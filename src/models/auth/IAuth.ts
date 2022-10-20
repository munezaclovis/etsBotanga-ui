import { IUser } from "../shared/user/IUser";

export type IAuthCredentials = {
    name?: string;
    username: string;
    password: string;
    password_confirmation?: string;
    code?: string;
};

export type IAuthErrors = {
    message: string;
    fields: {
        name?: string[];
        username?: string[];
        password?: string[];
        password_confirmation?: string[];
        code?: string[];
    };
    for: "login" | "register";
};

export type IAuthErrorsResponse = {
    message: string;
    errors: {
        name?: string[];
        username?: string[];
        password?: string[];
        password_confirmation?: string[];
        code?: string[];
    };
};

export type ILoginResponse = {
    access_token: string;
    user: Partial<IUser>;
};
