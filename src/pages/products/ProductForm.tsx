import IProduct, { IProductUpdate } from "../../models/products/IProduct";
import usePermission from "../../services/hooks/usePermission";
import { useProductMutation, useProductQuery } from "../../services/api/useApi";
import { useQueryClient } from "react-query";
import InputErrors from "../../components/form/InputErrors";
import LoadingSpinner from "../../components/utilities/LoadingSpinner";
import FormErrorMessage from "../../components/form/FormErrorMessage";

const ProductForm: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProduct>(`${product_id}`);
    const { cannot } = usePermission();

    const { mutate, error, isLoading } =
        useProductMutation<IProductUpdate>(product_id);
    const queryClient = useQueryClient();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutate(
            {
                name: String(formData.get("name")),
                summary: String(formData.get("summary")),
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
            className="d-flex flex-column border rounded-2 border-dark px-3 py-3"
        >
            <FormErrorMessage message={error?.message} />
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={data?.name ?? ""}
                    disabled={cannot("product:update")}
                />
                <InputErrors errors={error?.errors?.name} />
            </div>
            <div className="mb-3">
                <label htmlFor="summary" className="form-label">
                    Summary
                </label>
                <textarea
                    className="form-control"
                    name="summary"
                    defaultValue={data?.summary ?? ""}
                    disabled={cannot("product:update")}
                />
                <InputErrors errors={error?.errors?.summary} />
            </div>
            <button
                className="btn btn-outline-secondary btn-save ml-auto"
                disabled={isLoading || cannot("product:update")}
            >
                {isLoading && (
                    <span className="m-r-5">
                        <LoadingSpinner />
                    </span>
                )}
                Save
            </button>
            {/* <div className="">
                <button
                className="btn btn-outline-primary"
                    disabled={isLoading}
                    >
                    {isLoading && (
                        <span className="m-r-5">
                        <LoadingSpinner />
                        </span>
                        )}
                        Save
                        </button>
                        <button
                        className="btn btn-outline-warning mx-3"
                        disabled={isLoading}
                        >
                        Reset
                        </button>
                    </div> */}
        </form>
    );
};

export default ProductForm;
