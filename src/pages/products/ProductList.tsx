import { useContext } from "react";
import { Link } from "react-router-dom";
import AddToCartBtn from "../../components/buttons/AddToCartBtn";
import DeleteBtn from "../../components/buttons/DeleteBtn";
import PaginationLinks from "../../components/table/PaginateLinks";
import IPaginate from "../../models/pagination/IPaginate";
import IProduct from "../../models/products/IProduct";
import { useProductQuery } from "../../services/api/useApi";
import { CartContext } from "../../store/cart/context";
import { SET_RIGHTBAR } from "../../store/theme/actions";
import { ThemeContext } from "../../store/theme/context";

type PaginatedIProduct = IPaginate & { data: IProduct[] };

const ProductList = () => {
    const { data } = useProductQuery<PaginatedIProduct>(``, `?with=price`);
    const { addToCart } = useContext(CartContext);
    const { setTheme } = useContext(ThemeContext);
    const addToShoppingCart = ({ id }: { id: string }) => {
        addToCart({ product_id: id });
        setTheme(SET_RIGHTBAR(true));
    };
    return (
        <>
            {data?.data?.map((product, index) => {
                return (
                    <div key={index} className="col-md-6 col-lg-3">
                        <div className="card c_grid c_indigo shadow-sm">
                            <div className="body text-center d-flex flex-column">
                                <Link to={`${product.id}`}>
                                    <div className="circle">
                                        <img
                                            src={product.image_link}
                                            className="rounded-circle"
                                            style={{ height: "90px" }}
                                            alt="Product"
                                            loading="lazy"
                                        />
                                    </div>
                                </Link>
                                <h6 className="m-t-20">{product.name}</h6>
                                <span className="font-weight-light">
                                    {new Intl.NumberFormat("fr-CD", {
                                        style: "currency",
                                        currency: "CDF",
                                    }).format(product.price?.price!)}
                                </span>
                                <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                                    <AddToCartBtn
                                        onClick={() => {
                                            addToShoppingCart({
                                                id: product.id,
                                            });
                                        }}
                                    />
                                    <DeleteBtn permission={"product:delete"} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {
                <PaginationLinks
                    data={{
                        current_page: data?.current_page,
                        from: data?.from,
                        has_more_pages: data?.has_more_pages,
                        last_page: data?.last_page,
                        per_page: data?.per_page,
                        to: data?.to,
                        total: data?.total,
                        route: "products",
                    }}
                    setPage={() => {}}
                />
            }
        </>
    );
};

export default ProductList;
