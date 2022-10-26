import { FC, useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { AuthContext } from "../../store/auth/context";

const OrderBtn: FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    permissions?: `${string}:${string}`;
}> = ({ onClick, permissions: permission }) => {
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
            <MdAddShoppingCart /> <span>Order</span>
        </button>
    );
};

export default OrderBtn;
