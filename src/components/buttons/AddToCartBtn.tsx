import { FC } from "react";
import { AiOutlineAppstoreAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { CgExtensionAdd } from "react-icons/cg";

const AddToCartBtn: FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
    return (
        <button
            className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-1"
            onClick={onClick}
        >
            <AiOutlineShoppingCart className="fs-5" /> <span>Add</span>
        </button>
    );
};

export default AddToCartBtn;
