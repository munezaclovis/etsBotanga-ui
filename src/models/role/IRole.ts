import IPermission from "../permission/IPermission";
import { IUser } from "../shared/user/IUser";

export default interface IRole {
    id: string;
    name: string;
    permissions?: IPermission[];
}
