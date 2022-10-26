import { FC, useContext } from "react";
import { CgFormatCenter } from "react-icons/cg";
import { AuthContext } from "../../store/auth/context";

const DetailsBtn: FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    permission?: `${string}:${string}`;
}> = ({ onClick, permission: permissions }) => {
    const { user } = useContext(AuthContext);

    if (!user.details?.roles?.find((x) => x.name === "super-admin")) {
        if (permissions !== undefined) {
            if (!user.details?.roles?.at(0)?.permissions?.find((x) => x.name === permissions)) {
                return <></>;
            }
        }
    }
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
