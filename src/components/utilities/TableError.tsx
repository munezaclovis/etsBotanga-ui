import { FallbackProps } from "react-error-boundary";
import { BiErrorCircle } from "react-icons/bi";
import { IoReloadCircle } from "react-icons/io5";

const TableError: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
    return (
        <tr>
            <td colSpan={5}>
                <div className="text-danger fs-6 d-flex align-items-center justify-content-center">
                    <BiErrorCircle className="m-r-5" />
                    <small>Failed to fetch! </small>
                    <span className="m-l-10">
                        <IoReloadCircle
                            className="d-flex font-28 btn-reset-error"
                            onClick={resetErrorBoundary}
                        />
                    </span>
                </div>
            </td>
        </tr>
    );
};

export default TableError;
