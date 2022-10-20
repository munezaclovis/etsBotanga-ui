import { FC } from "react";
import { CgFormatCenter } from "react-icons/cg";

const DetailsBtn: FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
    return (
        <button
            className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center gap-1"
            onClick={onClick}
        >
            <CgFormatCenter /> <span>Details</span>
        </button>
    );
};

export default DetailsBtn;
