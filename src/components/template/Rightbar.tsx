import { useContext, useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { SET_RIGHTBAR } from "../../store/theme/actions";
import { ThemeContext } from "../../store/theme/context";
import { CartContext } from "../../store/cart/context";
import DeleteBtn from "../buttons/DeleteBtn";
import { Button, Modal } from "react-bootstrap";
import LoadingSpinner from "../utilities/LoadingSpinner";
import getApi from "../../services/api/getApi";
import InputErrors from "../form/InputErrors";
import { AxiosError } from "axios";
import FormErrorMessage from "../form/FormErrorMessage";

const Rightbar = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const { cart, cartLoading, loadCart, editQuantity, removeFromCart } = useContext(CartContext);
    const [checkoutModal, setCheckoutModal] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const api = getApi();
    const [checkoutForm, setCheckoutForm] = useState<{
        data?: { client?: string };
        errors?: { client?: [string]; message?: string };
    }>();
    const getTotal = () => {
        let sum = 0;
        cart?.items?.every((item) => {
            sum +=
                item.quantity *
                (item.product.price?.price! - (item.product.price?.price! * item.product.price?.discount!) / 100);
        });
        return sum;
    };

    const checkout = () => {
        setCheckoutLoading(true);
        setCheckoutForm({ ...checkoutForm, errors: undefined });
        api.post("/orders", { ...checkoutForm?.data, cart_id: cart.id })
            .then((res) => {
                loadCart();
                setCheckoutForm(undefined);
                setTheme(SET_RIGHTBAR(false));
                setCheckoutModal(false);
            })
            .catch((error: AxiosError<{ errors?: { client: [string] }; message: string }>) => {
                setCheckoutForm({
                    ...checkoutForm,
                    errors: { client: error.response?.data?.errors?.client, message: error.response?.data?.message },
                });
            })
            .finally(() => {
                setCheckoutLoading(false);
            });
    };

    useEffect(() => {
        if (theme.rightbar) loadCart();
    }, [theme.rightbar]);

    return (
        <div id="rightbar" className={`rightbar shadow${theme.rightbar ? " open" : ""}`}>
            <div className="body d-flex flex-column h-100">
                <div className="d-flex justify-content-between align-items-center border border-secondary mx-1 my-2 p-2">
                    <div
                        className={`btn btn-info${cart?.items?.length > 0 ? `` : ` visually-hidden`}`}
                        onClick={() => setCheckoutModal(true)}
                    >
                        Checkout
                    </div>
                    <Modal
                        show={checkoutModal}
                        onHide={() => setCheckoutModal(false)}
                        className="theme-indigo"
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Checkout</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormErrorMessage message={checkoutForm?.errors?.message} />
                            <div className="mb-3">
                                <label htmlFor="client" className="fs-6 mb-1">
                                    Client Name
                                </label>
                                <input
                                    type={"text"}
                                    name="client"
                                    className={`form-control${checkoutForm?.errors?.client ? " border-danger" : ""}`}
                                    value={checkoutForm?.data?.client ?? ""}
                                    placeholder={`Client name`}
                                    onChange={(e) =>
                                        setCheckoutForm({
                                            ...checkoutForm,
                                            data: { ...checkoutForm?.data, client: e.currentTarget.value },
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="method" className="fs-6 mb-1">
                                    Payment Method
                                </label>
                                <select name="method" className="form-control form-select">
                                    <option selected>Choose Payment method</option>
                                    <option value="cash">Cash</option>
                                    <option value="debit">Debit</option>
                                </select>
                            </div>
                            <InputErrors errors={checkoutForm?.errors?.client} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setCheckoutModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => checkout()}>
                                {checkoutLoading && <LoadingSpinner />} Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <span
                        className="btn btn-danger d-flex align-items-center justify-content-center py-1 px-2"
                        onClick={() => {
                            setTheme(SET_RIGHTBAR(!theme.rightbar));
                        }}
                    >
                        <AiOutlineCloseCircle className="fs-5 cursor-pointer icon-menu" />
                    </span>
                </div>
                <div className="tab-content flex-fill">
                    <ul className="shopping_cart list-unstyled mb-0 h-100">
                        {cartLoading ? (
                            <div className="d-flex align-items-center justify-content-center h-75">
                                <div
                                    className="spinner-border text-secondary"
                                    style={{ width: "65px", height: "65px" }}
                                    role="status"
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            cart?.items?.map((item, idx) => {
                                return (
                                    <li className="card m-0" key={idx}>
                                        <div className="body mb-2 media d-flex">
                                            <img
                                                src={
                                                    item.product.image_link ||
                                                    `https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/home/coca-cola-original-20oz.png`
                                                }
                                                alt=""
                                                className="media-object border border-secondary"
                                            />
                                            <div className="media-body">
                                                <span className="name">{item.product.name}</span>
                                                <span className="message">
                                                    {new Intl.NumberFormat("fr-CD", {
                                                        style: "currency",
                                                        currency: "CDF",
                                                    }).format(
                                                        item.product.price?.price! -
                                                            (item.product.price?.price! *
                                                                item.product.price?.discount!) /
                                                                100 ?? 1 * item.quantity
                                                    )}
                                                </span>
                                            </div>
                                            <div className="media-body align-self-center ml-auto d-flex gap-1">
                                                <span
                                                    className="text-warning pointer"
                                                    onClick={() => {
                                                        editQuantity({
                                                            cart_item_id: item.id,
                                                            product_id: item.product.id,
                                                            quantity: -1,
                                                        });
                                                    }}
                                                >
                                                    <AiOutlineMinus />
                                                </span>
                                                <span className="border border-secondary px-2 rounded">
                                                    {item.quantity}
                                                </span>
                                                <span
                                                    className="text-primary pointer"
                                                    onClick={() => {
                                                        editQuantity({
                                                            cart_item_id: item.id,
                                                            product_id: item.product.id,
                                                            quantity: 1,
                                                        });
                                                    }}
                                                >
                                                    <AiOutlinePlus />
                                                </span>
                                                <span className="m-l-15">
                                                    <DeleteBtn
                                                        onClick={() => {
                                                            removeFromCart({
                                                                cart_item_id: item.id,
                                                                product_id: item.product.id,
                                                            });
                                                        }}
                                                        text={false}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
                <div className="justify-content-end alert alert-dark">
                    <div className="d-flex justify-content-between">
                        <span className="fs-5">Total</span>
                        <span className="fs-5">
                            {new Intl.NumberFormat("fr-CD", {
                                style: "currency",
                                currency: "CDF",
                            }).format(getTotal())}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rightbar;
