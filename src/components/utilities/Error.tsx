import { FallbackProps } from "react-error-boundary";
import { BiErrorCircle } from "react-icons/bi";
const Error: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
    return (
        <div className="text-danger fs-6 d-flex align-items-center justify-content-center">
            <BiErrorCircle className="m-r-5" />
            <small>Failed to fetch! Reload</small>
        </div>
    );
};

export default Error;
