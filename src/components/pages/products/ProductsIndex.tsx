import { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import IPaginate from "../../../models/pagination/IPaginate";
import IProduct from "../../../models/products/IProduct";
import getApi from "../../../services/api/getApi";
import { CartContext } from "../../../store/cart/context";
import { SET_RIGHTBAR } from "../../../store/theme/actions";
import { ThemeContext } from "../../../store/theme/context";
import AddToCartBtn from "../../buttons/AddToCartBtn";
import CreateBtn from "../../buttons/CreateBtn";
import DeleteBtn from "../../buttons/DeleteBtn";
import DetailsBtn from "../../buttons/DetailsBtn";
import PaginationLinks from "../../table/PaginateLinks";
import BreadCrumb from "../../utilities/BreadCrumb";

const ProductsIndex = () => {
    const [products, setProducts] = useState<IPaginate & { data: IProduct[] }>();
    const { addToCart } = useContext(CartContext);
    const { setTheme } = useContext(ThemeContext);
    const api = getApi();
    const navigate = useNavigate();
    const addToShoppingCart = ({ id }: { id: string }) => {
        addToCart({ product_id: id });
        setTheme(SET_RIGHTBAR(true));
    };

    useEffect(() => {
        api.get<IPaginate & { data: IProduct[] }>("products").then((e) => setProducts(e.data));
    }, []);
    return (
        <>
            <div className="block-header">
                <div className="row clearfix">
                    <BreadCrumb title="Products" />
                    <div className="col-md-6 col-sm-12 text-right hidden-xs d-flex align-items-center justify-content-end">
                        <CreateBtn />
                    </div>
                </div>
            </div>
            <div className="row clearfix">
                {products?.data &&
                    products?.data.map((product, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="card c_grid c_indigo shadow-sm">
                                    <div className="body text-center d-flex flex-column">
                                        <div className="circle">
                                            <img
                                                src="https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/home/coca-cola-original-20oz.png"
                                                className="rounded-circle"
                                                style={{ height: "90px" }}
                                                alt="Product"
                                            />
                                        </div>
                                        <h6 className="m-t-20">{product.name}</h6>
                                        <span className="text-truncate">{product.summary}</span>
                                        <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                                            <AddToCartBtn
                                                onClick={() => {
                                                    addToShoppingCart({ id: product.id });
                                                }}
                                            />
                                            <DetailsBtn
                                                onClick={() => {
                                                    navigate(`${product.id}`);
                                                }}
                                            />
                                            <DeleteBtn />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {
                    <PaginationLinks
                        data={{
                            current_page: products?.current_page,
                            from: products?.from,
                            has_more_pages: products?.has_more_pages,
                            last_page: products?.last_page,
                            per_page: products?.per_page,
                            to: products?.to,
                            total: products?.total,
                            route: "products",
                        }}
                        setPage={() => {}}
                    />
                }
            </div>
        </>
    );
};

export default ProductsIndex;
