import { useDateTime } from "../../services/hooks/useDateTime";
import IProductHistory from "../../models/products/IProductHistory";
import IPaginate from "../../models/pagination/IPaginate";
import { useQuery } from "react-query";
import { useProductQuery } from "../../services/api/useApi";

type PaginatedProductHistory = IPaginate & { data: Array<IProductHistory> };

const ProductHistory: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<PaginatedProductHistory>(
        `${product_id}/history`
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
                                <small className="truncate">
                                    {history.name}
                                </small>
                            </span>
                        </td>
                        <td>
                            <span>
                                <small className="truncate">
                                    {history.summary}
                                </small>
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

export default ProductHistory;
