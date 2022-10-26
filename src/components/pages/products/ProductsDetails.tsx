import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaWarehouse } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import IProduct from "../../../models/products/IProduct";
import getApi from "../../../services/api/getApi";
import hasRole from "../../../services/hooks/hasRole";
import { AuthContext } from "../../../store/auth/context";
import { CartContext } from "../../../store/cart/context";
import { SET_RIGHTBAR } from "../../../store/theme/actions";
import { ThemeContext } from "../../../store/theme/context";
import DeleteBtn from "../../buttons/DeleteBtn";
import OrderBtn from "../../buttons/OrderBtn";
import BreadCrumb from "../../utilities/BreadCrumb";

type EditData = {
    name: string;
    summary: string;
    price?: number;
    quantity?: number;
};

const ProductsDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const api = getApi();
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [editData, setEditData] = useState<EditData>({} as EditData);
    const { addToCart } = useContext(CartContext);
    const { setTheme } = useContext(ThemeContext);
    const addToShoppingCart = ({ id }: { id: string }) => {
        addToCart({ product_id: id });
        setTheme(SET_RIGHTBAR(true));
    };

    useEffect(() => {
        api.get<IProduct>(`products/${params.id}?with=price,stock,priceHistory,stockHistory`)
            .then((response) => {
                setProduct(response.data);
                setEditData({
                    name: response.data.name,
                    price: response.data.price?.price,
                    quantity: response.data.stock?.quantity,
                    summary: response.data.summary,
                });
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 401) {
                    navigate(-1);
                }
                if (error.response?.status === 404) {
                    navigate("/404", { replace: true });
                }
            });
    }, []);

    return (
        <>
            <BreadCrumb title="Details" />
            <div className="row clear-fix">
                {product && (
                    <>
                        <div className="col-md-4">
                            <div className="card c_grid c_indigo">
                                <div className="card-body text-center d-flex flex-column">
                                    <div className="circle">
                                        <img
                                            src="https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/home/coca-cola-original-20oz.png"
                                            className="rounded-circle"
                                            style={{ height: "90px" }}
                                            alt="Product"
                                        />
                                    </div>
                                    <h6 className="m-t-20 fs-5">
                                        <strong>{product.name}</strong>
                                    </h6>
                                    <span className="text-truncate">{product.summary}</span>
                                    <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                                        <OrderBtn
                                            onClick={() => {
                                                addToShoppingCart({ id: product.id });
                                            }}
                                        />
                                        <DeleteBtn />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <h3 className="fs-3">More info</h3>
                                    <ul className="list-group">
                                        {product?.stock && (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Quantity in stock{" "}
                                                    <span className="badge badge-warning">
                                                        {product.stock.quantity}
                                                    </span>
                                                </li>
                                            </>
                                        )}
                                        {product?.price && (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Price
                                                    <span className="badge badge-primary">$ {product.price.price}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Discount
                                                    <span className="badge badge-success">{product.price.price} %</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={editData?.name ?? ""}
                                                onChange={(e) => {
                                                    setEditData({ ...editData!, name: e.target.value });
                                                }}
                                                disabled={!hasRole({ role: "product:update" })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">
                                                Price
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <AiOutlineDollar />
                                                </span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="99,99 $"
                                                    name="price"
                                                    value={editData?.price || 0}
                                                    onChange={(e) => {
                                                        setEditData({ ...editData, price: Number(e.target.value) });
                                                    }}
                                                    disabled={!hasRole({ role: "product:update" })}
                                                />
                                            </div>
                                        </div>
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
                                                    className="form-control"
                                                    placeholder="100"
                                                    value={editData?.quantity || 0}
                                                    onChange={(e) => {
                                                        setEditData({
                                                            ...editData,
                                                            quantity: Number(e.currentTarget.value),
                                                        });
                                                    }}
                                                    disabled={!hasRole({ role: "product:update" })}
                                                />
                                            </div>
                                        </div>
                                        <div className="">
                                            <button className="btn btn-outline-primary">Save</button>
                                            <button className="btn btn-outline-warning mx-3">Reset</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card mt-2">
                                <div className="body">
                                    <pre>{JSON.stringify([product], null, 2)}</pre>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductsDetails;
