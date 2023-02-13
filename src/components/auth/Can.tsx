import IPageProps from "../../models/shared/IPageProps";
import usePermission from "../../services/hooks/usePermission";

const Can: React.FC<IPageProps & { permission: string }> = ({
    permission,
    children,
}) => {
    const { cannot } = usePermission();

    if (cannot(permission)) return null;

    return <>{children}</>;
};

export default Can;
