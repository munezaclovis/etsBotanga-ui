import IModel from "../IModel";
import { IUser } from "./../shared/user/IUser";
export default interface IProductPriceHistory extends IModel {
    product_id: string;
    user_id: string;
    prev_price: number;
    prev_discount: number;
    new_price: number;
    new_discount: number;
    user?: IUser;
}
