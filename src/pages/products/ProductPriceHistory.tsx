import IPaginate from "../../models/pagination/IPaginate";
import IProductPriceHistory from "../../models/products/IProductPriceHistory";
import { useProductQuery } from "../../services/api/useApi";
import useCurrency from "../../services/hooks/useCurrency";
import { useDateTime } from "../../services/hooks/useDateTime";

type PaginatedProductPriceHistory = IPaginate & {
    data: Array<IProductPriceHistory>;
};

const ProductPriceHistory: React.FC<{ product_id: string }> = ({
    product_id,
}) => {
    const { data } = useProductQuery<PaginatedProductPriceHistory>(
        `${product_id}/price-history`
    );
    return (
        <>
            {data?.data?.map((history, index) => {
                return (
                    <tr key={index}>
                        <td>
                            <span>{++index}</span>
                        </td>
                        <td>
                            <span>{history.actor?.name}</span>
                        </td>
                        <td>
                            <span>
                                <small className="">
                                    {useCurrency(history.price)}
                                </small>
                            </span>
                        </td>
                        <td>
                            <span>
                                <small>{history.discount}%</small>
                            </span>
                        </td>
                        <td>
                            {useDateTime(history.created_at, {
                                dateStyle: "short",
                            })}
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default ProductPriceHistory;
