import { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteBtn: FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement>; text?: boolean }> = ({
    onClick,
    text = true,
}) => {
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
