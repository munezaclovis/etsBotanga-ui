import { FC, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from "../../store/auth/context";

const DeleteBtn: FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    permission?: `${string}:${string}`;
    text?: boolean;
}> = ({ onClick, permission, text = true }) => {
    const { user } = useContext(AuthContext);

    if (!user.details?.roles?.find((x) => x.name === "super-admin")) {
        if (permission !== undefined) {
            if (
                !user.details?.roles
                    ?.at(0)
                    ?.permissions?.find((x) => x.name === permission)
            ) {
                return <></>;
            }
        }
    }
    return (
        <button
            className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-1"
            onClick={onClick}
        >
            <AiOutlineDelete /> {text && <span>Delete</span>}
        </button>
    );
};

export default DeleteBtn;
