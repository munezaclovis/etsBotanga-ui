import IModel from "../IModel";
import IProduct from "../products/IProduct";
import { IUser } from "./../shared/user/IUser";
export default interface IOrder extends IModel {
    user_id: string;
    owner?: IUser;
    items_count?: number;
    client: string;
    items?: Array<{
        order_id: string;
        product_id: string;
        price: number;
        discount: number;
        quantity: number;
        order?: IOrder;
        product?: IProduct;
    }>;
}
