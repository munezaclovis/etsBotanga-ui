import { FC } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { CgExtensionAdd } from "react-icons/cg";

const CreateBtn: FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
    return (
        <button
            className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-1"
            onClick={onClick}
        >
            <CgExtensionAdd className="fs-5" /> <span>Create</span>
        </button>
    );
};

export default CreateBtn;
