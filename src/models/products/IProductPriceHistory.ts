import IModel from "../IModel";
import { IUser } from "./../shared/user/IUser";
export default interface IProductPriceHistory extends IModel {
    product_id: string;
    user_id: string;
    price: number;
    discount: number;
    actor?: IUser;
}
