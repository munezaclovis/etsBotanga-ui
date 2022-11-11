import { IUser } from "./../shared/user/IUser";
import IModel from "../IModel";

export default interface IProductStockHistory extends IModel {
    product_id: string;
    user_id: string;
    supplier_id: string;
    prev_quantity: number;
    new_quantity: number;
    user?: IUser;
}
