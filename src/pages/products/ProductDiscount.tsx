import IProductPrice from "../../models/products/IProductPrice";
import { useProductQuery } from "../../services/api/useApi";

const ProductDiscount: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProductPrice>(`${product_id}/price`);
    return <span className="badge badge-primary">{data?.discount} %</span>;
};

export default ProductDiscount;
