import IProduct from "../products/IProduct";

export default interface ICart {
    id: string;
    items: Array<ICartItem>;
}

export interface ICartItem {
    id: string;
    product: IProduct;
    quantity: number;
}
