import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaWarehouse } from "react-icons/fa";
import { TbShoppingCartDiscount } from "react-icons/tb";
import getApi from "../../../services/api/getApi";
import FormErrorMessage from "../../form/FormErrorMessage";
import InputErrors from "../../form/InputErrors";
import BreadCrumb from "../../utilities/BreadCrumb";
import LoadingSpinner from "../../utilities/LoadingSpinner";

interface ProductInterface {
    loading: boolean;
    data?: { name?: string; image_link?: string; price?: number; discount?: number; quantity?: number };
    errors?: {
        message: string;
        fields: { name?: string[]; image_link?: string[]; price?: string[]; discount?: string[]; quantity?: string[] };
    };
}
const ProductCreate = () => {
    const api = getApi();
    const [product, setProduct] = useState<ProductInterface>({
        loading: false,
        data: { price: 0, quantity: 0, discount: 0 },
    });
    const [addStatus, setAddStatus] = useState<string>();
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAddStatus(undefined);
        setProduct((prev) => ({ ...prev, errors: undefined, loading: true }));
        api.post<ProductInterface["data"]>("products", product.data)
            .then((res) => {
                setAddStatus("Product added successfuly");
                setProduct((prev) => ({ ...prev, errors: undefined, data: undefined }));
            })
            .catch((error: AxiosError<any>) => {
                if (error.code !== "500") {
                    setProduct((prev) => ({
                        ...prev,
                        errors: { message: error.response?.data?.message, fields: error.response?.data.errors },
                    }));
                }
            })
            .finally(() => {
                setProduct((prev) => ({ ...prev, loading: false }));
            });
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, data: { ...product?.data, [e.target.name]: e.target.value } });
    };
    return (
        <>
            <BreadCrumb title="Create Product" />
            {addStatus !== undefined ? <div className="alert alert-success">{addStatus}</div> : ""}
            <div className="card">
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <FormErrorMessage message={product.errors?.message} />
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className={`form-control${
                                    product?.errors?.fields?.name !== undefined ? " border-danger" : ""
                                }`}
                                name="name"
                                value={product?.data?.name ?? ""}
                                onChange={onChange}
                            />
                            <InputErrors errors={product?.errors?.fields?.name} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Image link
                            </label>
                            <input
                                type="text"
                                className={`form-control${
                                    product?.errors?.fields?.image_link !== undefined ? " border-danger" : ""
                                }`}
                                name="image_link"
                                value={product?.data?.image_link ?? ""}
                                onChange={onChange}
                            />
                            <InputErrors errors={product?.errors?.fields?.image_link} />
                        </div>

                        <div className="mb-3">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="price" className="form-label">
                                        Discount
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbShoppingCartDiscount />
                                        </span>
                                        <input
                                            type="number"
                                            className={`form-control${
                                                product?.errors?.fields?.discount !== undefined ? " border-danger" : ""
                                            }`}
                                            name="discount"
                                            value={product?.data?.discount ?? 0}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <InputErrors errors={product?.errors?.fields?.discount} />
                                </div>
                                <div className="col">
                                    <label htmlFor="price" className="form-label">
                                        Price
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <AiOutlineDollar />
                                        </span>
                                        <input
                                            type="number"
                                            className={`form-control${
                                                product?.errors?.fields?.price !== undefined ? " border-danger" : ""
                                            }`}
                                            name="price"
                                            value={product?.data?.price ?? 0}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <InputErrors errors={product?.errors?.fields?.price} />
                                </div>
                                <div className="col">
                                    <label htmlFor="stock" className="form-label">
                                        Stock / Quantity
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaWarehouse />
                                        </span>
                                        <input
                                            type="number"
                                            className={`form-control${
                                                product?.errors?.fields?.quantity !== undefined ? " border-danger" : ""
                                            }`}
                                            name="quantity"
                                            value={product?.data?.quantity ?? 0}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <InputErrors errors={product?.errors?.fields?.quantity} />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button className="btn btn-outline-primary" disabled={product.loading}>
                                {product.loading ? (
                                    <span style={{ marginRight: "5px" }} className="">
                                        <LoadingSpinner />
                                    </span>
                                ) : null}
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductCreate;
