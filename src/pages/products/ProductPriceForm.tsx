import { AiOutlineDollar, AiOutlinePercentage } from "react-icons/ai";
import { useProductMutation, useProductQuery } from "../../services/api/useApi";
import IProductPrice, {
    IProductPriceUpdate,
} from "../../models/products/IProductPrice";
import InputErrors from "../../components/form/InputErrors";
import LoadingSpinner from "../../components/utilities/LoadingSpinner";
import usePermission from "../../services/hooks/usePermission";
import { useQueryClient } from "react-query";

const ProductPriceForm: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProductPrice>(`${product_id}/price`);
    const { cannot } = usePermission();
    const queryClient = useQueryClient();
    const { error, isLoading, mutate } =
        useProductMutation<IProductPriceUpdate>(`${product_id}/price`);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        mutate(
            {
                price: Number(formData.get("price")?.toString()),
                discount: Number(formData.get("discount")?.toString()),
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
            className="d-flex flex-column mb-4 border px-3 py-3 rounded-2 border-dark"
        >
            <div className="row">
                <div className="mb-3 col-md-6">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <AiOutlineDollar />
                        </span>
                        <input
                            type="number"
                            step="any"
                            className="form-control"
                            name="price"
                            defaultValue={data?.price ?? 0}
                            disabled={cannot("productPrice:update")}
                        />
                        <InputErrors errors={error?.errors?.price} />
                    </div>
                </div>
                <div className="mb-3 col-md-6">
                    <label htmlFor="discount" className="form-label">
                        Dicount
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <AiOutlinePercentage />
                        </span>
                        <input
                            type="number"
                            step="any"
                            className="form-control"
                            name="discount"
                            defaultValue={data?.discount ?? 0}
                            disabled={cannot("productPrice:update")}
                        />
                        <InputErrors errors={error?.errors?.discount} />
                    </div>
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

export default ProductPriceForm;
