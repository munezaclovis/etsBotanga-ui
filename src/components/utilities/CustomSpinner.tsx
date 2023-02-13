import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <Spinner size="sm" animation="border" />
        </div>
    );
};

export default CustomSpinner;
