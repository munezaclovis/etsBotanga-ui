import IRole from "../../role/IRole";

export type IUser = {
    id: string;
    name: string;
    username: string;
    created_at: string;
    updated_at: string;
    roles?: IRole[];
};

export type IUserError = {
    message: string;
    fields: {
        name?: string[];
        username?: string[];
        created_at?: string[];
        updated_at?: string[];
        avatar?: string[];
    };
};
