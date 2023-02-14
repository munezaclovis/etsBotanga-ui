import IProductStock from "../../models/products/IProductStock";
import { useProductQuery } from "../../services/api/useApi";

const ProductStock: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProductStock>(`${product_id}/stock`);
    return <span className="badge badge-warning">{data?.quantity}</span>;
};

export default ProductStock;
