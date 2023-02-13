import IModel from "../IModel";
import { IUser } from "../shared/user/IUser";

export default interface IProductHistory extends IModel {
    product_id: string;
    user_id: string;
    name: string;
    summary: string;
    actor?: IUser;
}

export interface IProductHistoryUpdate {
    name: string;
    summary: string;
}
