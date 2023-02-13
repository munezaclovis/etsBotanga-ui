import IModel from "../IModel";
import IProductHistory from "./IProductHistory";
import IProductPrice from "./IProductPrice";
import IProductPriceHistory from "./IProductPriceHistory";
import IProductStock from "./IProductStock";
import IProductStockHistory from "./IProductStockHistory";

export default interface IProduct extends IModel {
    id: string;
    name: string;
    summary: string;
    image_link: string;
    stock?: IProductStock;
    price?: IProductPrice;
    history?: Array<IProductHistory>;
    stock_history?: Array<IProductStockHistory>;
    price_history?: Array<IProductPriceHistory>;
}

export interface IProductUpdate {
    name?: string;
    image_link?: string;
    summary?: string;
}
