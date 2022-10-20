import { FC, useContext } from "react";
import { AuthContext } from "../../store/auth/context";

type functionType = (param: { role: string }) => boolean;
const hasRole: functionType = ({ role }) => {
    const { user } = useContext(AuthContext);
    let hasAccess = false;
    if (user.details?.roles?.find((x) => x.name === "super-admin")) {
        hasAccess = true;
    } else {
        user.details?.roles?.forEach((item) => {
            if (item.permissions?.find((x) => x.name === role) !== undefined) {
                hasAccess = true;
                return;
            }
        });
    }
    return hasAccess;
};

export default hasRole;
