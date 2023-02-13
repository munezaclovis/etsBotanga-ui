import { Suspense } from "react";
import { Link } from "react-router-dom";
import CreateBtn from "../../components/buttons/CreateBtn";
import BreadCrumb from "../../components/utilities/BreadCrumb";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../components/utilities/Error";
import CustomSpinner from "../../components/utilities/CustomSpinner";
import ProductList from "./ProductList";
import LoadingSpinner from "../../components/utilities/LoadingSpinner";
import { Spinner } from "react-bootstrap";

const ProductsIndex = () => {
    return (
        <>
            <div className="block-header">
                <div className="row clearfix">
                    <BreadCrumb title="Products" />
                    <div className="col-md-6 col-sm-12 text-right hidden-xs d-flex align-items-center justify-content-end">
                        <Link to={`create`}>
                            <CreateBtn permission="product:create" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row clearfix">
                <ErrorBoundary FallbackComponent={Error}>
                    <Suspense
                        fallback={
                            <Spinner
                                animation="border"
                                className="d-flex mx-auto"
                            />
                        }
                    >
                        <ProductList />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </>
    );
};

export default ProductsIndex;
