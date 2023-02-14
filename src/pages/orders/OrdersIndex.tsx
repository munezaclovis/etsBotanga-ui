import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../components/utilities/BreadCrumb";
import IOrder from "../../models/order/IOrder";
import IPaginate from "../../models/pagination/IPaginate";
import getApi from "../../services/api/useApi";
import { useDateTime } from "../../services/hooks/useDateTime";
import { CartContext } from "../../store/cart/context";

const OrdersIndex = () => {
    const api = getApi();
    const [orders, setOrders] = useState<IPaginate & { data: IOrder[] }>();
    const { cart } = useContext(CartContext);
    useEffect(() => {
        api.get<IPaginate & { data: IOrder[] }>("orders").then((res) => {
            setOrders(res.data);
        });
    }, [cart.items]);

    return (
        <>
            <div className="block-header">
                <div className="row clearfix">
                    <BreadCrumb title="Orders" />
                </div>
            </div>
            <div className="col-12">
                <div className="table-responsive">
                    <table className="table header-border table-hover table-custom spacing8">
                        <thead>
                            <tr className="font-weight-bold">
                                <th className="w60">#</th>
                                <th>Order By</th>
                                <th>Client</th>
                                <th className="">No Products</th>
                                <th>Total Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.data?.map((order, index) => {
                                let total = 0;
                                order.items?.map((item) => {
                                    total +=
                                        item.quantity *
                                        item.price *
                                        item.discount;
                                });
                                return (
                                    <tr key={index}>
                                        <td className="w60">{index}</td>
                                        <td>{order.owner?.name}</td>
                                        <td>{order.client}</td>
                                        <td className="">
                                            {order.items_count}
                                        </td>
                                        <td>{total}</td>
                                        <td>
                                            {useDateTime(order.created_at, {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default OrdersIndex;
