import { AxiosError } from "axios";
import { useState } from "react";
import FormErrorMessage from "../../components/form/FormErrorMessage";
import InputErrors from "../../components/form/InputErrors";
import BreadCrumb from "../../components/utilities/BreadCrumb";
import getApi from "../../services/api/useApi";

interface IngredientInterface {
    loading: boolean;
    data?: {
        name?: string;
        image_link?: string;
        price?: number;
        discount?: number;
        quantity?: number;
    };
    errors?: {
        message: string;
        fields: {
            name?: string[];
            image_link?: string[];
            price?: string[];
            discount?: string[];
            quantity?: string[];
        };
    };
}

const IngredientsCreate = () => {
    const api = getApi();
    const [ingredient, setIngredient] = useState<IngredientInterface>({
        loading: false,
        data: { price: 0, quantity: 0, discount: 0 },
    });
    const [addStatus, setAddStatus] = useState<string>();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAddStatus(undefined);
        setIngredient((prev) => ({
            ...prev,
            errors: undefined,
            loading: true,
        }));
        api.post<IngredientInterface["data"]>("ingredients", ingredient.data)
            .then((res) => {
                setAddStatus("Ingredient added successfuly");
                setIngredient((prev) => ({
                    ...prev,
                    errors: undefined,
                    data: undefined,
                }));
            })
            .catch((error: AxiosError<any>) => {
                if (error.code !== "500") {
                    setIngredient((prev) => ({
                        ...prev,
                        errors: {
                            message: error.response?.data?.message,
                            fields: error.response?.data.errors,
                        },
                    }));
                }
            })
            .finally(() => {
                setIngredient((prev) => ({ ...prev, loading: false }));
            });
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient({
            ...ingredient,
            data: { ...ingredient?.data, [e.target.name]: e.target.value },
        });
    };

    return (
        <>
            <BreadCrumb title="Create Ingredient" />
            {addStatus !== undefined ? (
                <div className="alert alert-success">{addStatus}</div>
            ) : (
                ""
            )}
            <div className="card">
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <FormErrorMessage
                            message={ingredient.errors?.message}
                        />
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className={`form-control${
                                    ingredient?.errors?.fields?.name !==
                                    undefined
                                        ? " border-danger"
                                        : ""
                                }`}
                                name="name"
                                value={ingredient?.data?.name ?? ""}
                                onChange={onChange}
                            />
                            <InputErrors
                                errors={ingredient?.errors?.fields?.name}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default IngredientsCreate;
