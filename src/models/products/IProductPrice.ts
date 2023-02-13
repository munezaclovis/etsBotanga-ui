import IModel from "../IModel";

export default interface IProductPrice extends IModel {
    product_id: string;
    price: number;
    discount: number;
}

export interface IProductPriceUpdate {
    price: number;
    discount: number;
}
