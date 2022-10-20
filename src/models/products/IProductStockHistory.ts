export default interface IProductStockHistory {
    id: string;
    product_id: string;
    user_id: string;
    supplier_id: string;
    prev_quantity: number;
    new_quantity: number;
}
