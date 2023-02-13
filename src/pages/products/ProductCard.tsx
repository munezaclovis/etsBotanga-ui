import { useContext } from "react";
import IProduct from "../../models/products/IProduct";
import { CartContext } from "../../store/cart/context";
import { ThemeContext } from "../../store/theme/context";
import { SET_RIGHTBAR } from "../../store/theme/actions";
import OrderBtn from "../../components/buttons/OrderBtn";
import DeleteBtn from "../../components/buttons/DeleteBtn";
import useApi, { useProductQuery } from "../../services/api/useApi";

const ProductCard: React.FC<{ product_id: string }> = ({ product_id }) => {
    const { data } = useProductQuery<IProduct>(`${product_id}`);
    const { addToCart } = useContext(CartContext);
    const { setTheme } = useContext(ThemeContext);
    const addToShoppingCart = ({ id }: { id: string }) => {
        addToCart({ product_id: id });
        setTheme(SET_RIGHTBAR(true));
    };

    return (
        <div className="card-body text-center d-flex flex-column">
            <div className="circle">
                <img
                    src={data?.image_link}
                    className="rounded-circle"
                    style={{ height: "90px" }}
                    alt="Product"
                />
            </div>
            <h6 className="m-t-20 fs-5">
                <strong>{data?.name}</strong>
            </h6>
            <span>{data?.summary}</span>
            <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                <OrderBtn
                    onClick={() => {
                        addToShoppingCart({
                            id: data?.id ?? "",
                        });
                    }}
                />
                <DeleteBtn />
            </div>
        </div>
    );
};

export default ProductCard;
