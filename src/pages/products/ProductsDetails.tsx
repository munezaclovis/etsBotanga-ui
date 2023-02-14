import { useParams } from "react-router-dom";
import Can from "../../components/auth/Can";
import CustomErrorBoundary from "../../components/utilities/CustomErrorBoundary";
import Error from "../../components/utilities/Error";
import SmallError from "../../components/utilities/SmallError";
import TableError from "../../components/utilities/TableError";
import TableSpinner from "../../components/utilities/TableSpinner";
import ProductCard from "./ProductCard";
import ProductDiscount from "./ProductDiscount";
import ProductEditForms from "./ProductEditForms";
import ProductHistory from "./ProductHistory";
import ProductPrice from "./ProductPrice";
import ProductPriceHistory from "./ProductPriceHistory";
import ProductStock from "./ProductStock";
import ProductStockHistory from "./ProductStockHistory";

const ProductsDetails = () => {
    const params = useParams<{ id: string }>();
    return (
        <>
            {/* <BreadCrumb title="Details" /> */}
            <div className="row clear-fix">
                <div className="col-md-4">
                    <div className="card c_grid c_indigo">
                        <div className="card-title">Display</div>
                        <CustomErrorBoundary FallbackComponent={Error}>
                            <ProductCard product_id={`${params.id}`} />
                        </CustomErrorBoundary>
                    </div>
                    <div className="card">
                        <div className="card-title">More info</div>
                        <div className="body">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Quantity in stock
                                    <CustomErrorBoundary
                                        FallbackComponent={SmallError}
                                    >
                                        <ProductStock
                                            product_id={params.id ?? ""}
                                        />
                                    </CustomErrorBoundary>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Price per unit
                                    <CustomErrorBoundary
                                        FallbackComponent={SmallError}
                                    >
                                        <ProductPrice
                                            product_id={params.id ?? ""}
                                        />
                                    </CustomErrorBoundary>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Active discount
                                    <CustomErrorBoundary
                                        FallbackComponent={SmallError}
                                    >
                                        <ProductDiscount
                                            product_id={params.id ?? ""}
                                        />
                                    </CustomErrorBoundary>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">Restocks</div>
                        <div className="body">
                            <ul className="list-group">
                                <CustomErrorBoundary
                                    FallbackComponent={SmallError}
                                >
                                    <ProductStockHistory
                                        product_id={params.id ?? ""}
                                    />
                                </CustomErrorBoundary>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <Can permission={"product:update"}>
                        <ProductEditForms />
                    </Can>
                    <div className="card mt-2">
                        <div className="card-title">Product History</div>
                        <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover table-custom spacing5">
                                    <thead>
                                        <tr>
                                            <td
                                                style={{
                                                    width: "30px",
                                                }}
                                            >
                                                #
                                            </td>
                                            <td>Actor</td>
                                            <td>Name</td>
                                            <td>Summary</td>
                                            <td
                                                style={{
                                                    width: "100px",
                                                }}
                                            >
                                                Date
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <CustomErrorBoundary
                                            FallbackComponent={TableError}
                                            SkeletonComponent={TableSpinner}
                                        >
                                            <ProductHistory
                                                product_id={params.id ?? ""}
                                            />
                                        </CustomErrorBoundary>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-2">
                        <div className="card-title">Price History</div>
                        <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover table-custom spacing5">
                                    <thead>
                                        <tr>
                                            <td
                                                style={{
                                                    width: "30px",
                                                }}
                                            >
                                                #
                                            </td>
                                            <td>Actor</td>
                                            <td>Price</td>
                                            <td>Discount</td>
                                            <td
                                                style={{
                                                    width: "100px",
                                                }}
                                            >
                                                Date
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <CustomErrorBoundary
                                            FallbackComponent={TableError}
                                            SkeletonComponent={TableSpinner}
                                        >
                                            <ProductPriceHistory
                                                product_id={params.id ?? ""}
                                            />
                                        </CustomErrorBoundary>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsDetails;
