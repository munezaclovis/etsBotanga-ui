import { FC, useContext } from "react";
import { CgExtensionAdd } from "react-icons/cg";
import { AuthContext } from "../../store/auth/context";

const CreateBtn: FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    permission?: `${string}:${string}`;
}> = ({ onClick, permission }) => {
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
            className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center gap-1"
            onClick={onClick}
        >
            <CgExtensionAdd className="fs-5" /> <span>Create</span>
        </button>
    );
};

export default CreateBtn;
