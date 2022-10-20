export default interface IProductPriceHistory {
    id: string;
    product_id: string;
    user_id: string;
    prev_price: number;
    prev_discount: number;
    new_price: number;
    new_discount: number;
}
