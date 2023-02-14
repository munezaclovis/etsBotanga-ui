import IProductPrice from "../../models/products/IProductPrice";
import { useProductQuery } from "../../services/api/useApi";

const ProductPrice: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProductPrice>(`${product_id}/price`);
    return <span className="badge badge-primary">$ {data?.price}</span>;
};

export default ProductPrice;
