import IModel from "../../IModel";
import IRole from "../../role/IRole";

export interface IUser extends IModel {
    name: string;
    username: string;
    roles?: IRole[];
}

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
