import { FaLongArrowAltRight } from "react-icons/fa";
import IPaginate from "../../models/pagination/IPaginate";
import IProductStockHistory from "../../models/products/IProductStockHistory";
import { useProductQuery } from "../../services/api/useApi";
import { useDateTime } from "../../services/hooks/useDateTime";

type PaginatedProductStockHistory = IPaginate & {
    data: Array<IProductStockHistory>;
};

const ProductStockHistory: React.FC<{ product_id: string }> = ({
    product_id,
}) => {
    const { data } = useProductQuery<PaginatedProductStockHistory>(
        `${product_id}/stock-history`
    );

    return (
        <>
            {data?.data?.map((stock, index) => {
                return (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{stock.actor?.name}</span>
                        <small className="badge badge-pill badge-primary">
                            {useDateTime(stock.created_at, {
                                dateStyle: "short",
                            })}
                        </small>
                        <div className="d-flex justify-content-center align-items-center">
                            <FaLongArrowAltRight />
                            <span className="badge badge-light m-l-10">
                                <small className="text-light">
                                    {stock.quantity}
                                </small>
                            </span>
                        </div>
                    </li>
                );
            })}
        </>
    );
};

export default ProductStockHistory;
