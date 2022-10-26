import React, { useContext, useEffect, useState } from "react";
import IOrder from "../../../models/order/IOrder";
import IPaginate from "../../../models/pagination/IPaginate";
import getApi from "../../../services/api/getApi";
import { CartContext } from "../../../store/cart/context";
import BreadCrumb from "../../utilities/BreadCrumb";

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
                            <tr>
                                <th className="w60">#</th>
                                <th>Owner</th>
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
                                    total += item.quantity * item.price * item.discount;
                                });
                                return (
                                    <tr key={index}>
                                        <td className="w60">{index}</td>
                                        <td>{order.owner?.name}</td>
                                        <td>{order.client}</td>
                                        <td className="">{order.items_count}</td>
                                        <td>{total}</td>
                                        <td>
                                            {Intl.DateTimeFormat("fr-CD", {
                                                dateStyle: "full",
                                                timeStyle: "short",
                                            }).format(new Date(order.created_at))}
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
