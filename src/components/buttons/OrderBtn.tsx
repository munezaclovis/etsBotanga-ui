import { FC } from "react";
import { MdAddShoppingCart } from "react-icons/md";

const OrderBtn: FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
    return (
        <button
            className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-1"
            onClick={onClick}
        >
            <MdAddShoppingCart /> <span>Order</span>
        </button>
    );
};

export default OrderBtn;
