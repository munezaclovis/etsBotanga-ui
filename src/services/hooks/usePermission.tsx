import { useContext } from "react";
import { AuthContext } from "../../store/auth/context";

const usePermission = () => {
    const { user } = useContext(AuthContext);

    const is = (role: string) => {
        return user.details?.roles?.some((r) => {
            return r.name === role || r.name === "super-admin";
        });
    };

    const isnot = (role: string) => {
        return !is(role);
    };

    const can = (permission: string) => {
        if (is("super-admin")) return true;

        return user.details?.roles?.some((role) => {
            return role?.permissions?.some((perm) =>
                permission.includes(perm.name)
            );
        });
    };

    const cannot = (permission: string) => {
        return !can(permission);
    };

    return { can, cannot, is, isnot };
};

export default usePermission;
