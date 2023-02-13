import IModel from "../IModel";

export default interface IProductStock extends IModel {
    product_id: string;
    quantity: number;
}

export interface IProductStockUpdate {
    quantity: number;
}
