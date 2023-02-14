import IPermission from "../permission/IPermission";

export default interface IRole {
    id: string;
    name: string;
    permissions?: IPermission[];
}
