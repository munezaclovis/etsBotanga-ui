import { useParams } from "react-router-dom";
import CustomErrorBoundary from "../../components/utilities/CustomErrorBoundary";
import SmallError from "../../components/utilities/SmallError";
import ProductForm from "./ProductForm";
import ProductPriceForm from "./ProductPriceForm";
import ProductStockForm from "./ProductStockForm";

const ProductEditForms = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="card">
            <div className="card-title">Edit Form</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <CustomErrorBoundary FallbackComponent={SmallError}>
                            <ProductForm product_id={`${id}`} />
                        </CustomErrorBoundary>
                    </div>
                    <div className="col-md-6">
                        <CustomErrorBoundary FallbackComponent={SmallError}>
                            <ProductPriceForm product_id={`${id}`} />
                        </CustomErrorBoundary>
                        <CustomErrorBoundary FallbackComponent={SmallError}>
                            <ProductStockForm product_id={`${id}`} />
                        </CustomErrorBoundary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditForms;
