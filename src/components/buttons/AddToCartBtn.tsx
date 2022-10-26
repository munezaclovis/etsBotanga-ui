import { FC, useContext, useState } from "react";
import { AiOutlineAppstoreAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { CgExtensionAdd } from "react-icons/cg";
import { AuthContext } from "../../store/auth/context";

const AddToCartBtn: FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    permission?: `${string}:${string}`;
}> = ({ onClick, permission }) => {
    const { user } = useContext(AuthContext);

    if (!user.details?.roles?.find((x) => x.name === "super-admin")) {
        if (permission !== undefined) {
            if (!user.details?.roles?.at(0)?.permissions?.find((x) => x.name === permission)) {
                return <></>;
            }
        }
    }

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
