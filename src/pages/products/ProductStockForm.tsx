import { FaWarehouse } from "react-icons/fa";
import { useProductMutation, useProductQuery } from "../../services/api/useApi";
import InputErrors from "../../components/form/InputErrors";
import IProductStock, {
    IProductStockUpdate,
} from "../../models/products/IProductStock";
import LoadingSpinner from "../../components/utilities/LoadingSpinner";
import usePermission from "../../services/hooks/usePermission";
import { useQueryClient } from "react-query";

const ProductStockForm: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProductStock>(`${product_id}/stock`);
    const queryClient = useQueryClient();
    const { error, isLoading, mutate } =
        useProductMutation<IProductStockUpdate>(`${product_id}/stock`);
    const { cannot } = usePermission();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        mutate(
            {
                quantity: Number(formData.get("quantity")?.toString()),
            },
            {
                onSuccess: (res) => {
                    queryClient.invalidateQueries([
                        "products",
                        `${product_id}`,
                    ]);
                },
            }
        );
    };
    return (
        <form
            onSubmit={onSubmit}
            className="d-flex flex-column border rounded-2 px-3 py-3 border-dark"
        >
            <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                    Stock / Quantity
                </label>
                <div className="input-group">
                    <span className="input-group-text">
                        <FaWarehouse />
                    </span>
                    <input
                        type="number"
                        step="any"
                        name="quantity"
                        className="form-control"
                        placeholder="100"
                        defaultValue={data?.quantity ?? 0}
                        disabled={cannot("productStock:update")}
                    />
                    <InputErrors errors={error?.errors?.quantity} />
                </div>
            </div>
            <button
                className="btn btn-outline-secondary btn-save ml-auto"
                disabled={isLoading}
            >
                {isLoading && (
                    <span className="m-r-5">
                        <LoadingSpinner />
                    </span>
                )}
                Save
            </button>
        </form>
    );
};

export default ProductStockForm;
