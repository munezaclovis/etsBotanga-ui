import { useEffect, useState } from "react";
import IPaginate from "../../models/pagination/IPaginate";
import { IUser } from "../../models/shared/user/IUser";
import getApi from "../../services/api/useApi";
import PaginationLinks from "../../components/table/PaginateLinks";
import BreadCrumb from "../../components/utilities/BreadCrumb";
import UserAvatar from "../../assets/img/user-avatar.png";
import DetailsBtn from "../../components/buttons/DetailsBtn";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../../components/buttons/DeleteBtn";

const UsersIndex = () => {
    const [users, setUsers] = useState<IPaginate & { data: IUser[] }>();
    const navigate = useNavigate();
    const api = getApi();
    useEffect(() => {
        api.get("users?page=1").then((e) => setUsers(e.data));
    }, []);

    return (
        <>
            <BreadCrumb title="Users" />
            <div className="row clearfix">
                {users?.data &&
                    users?.data.map((user, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="card c_grid c_indigo shadow-sm">
                                    <div className="body text-center d-flex flex-column">
                                        <div className="circle">
                                            <img
                                                src={UserAvatar}
                                                className="rounded-circle"
                                                style={{ height: "90px" }}
                                                alt="Product"
                                            />
                                        </div>
                                        <h6 className="m-t-20">{user.name}</h6>
                                        {user.roles && (
                                            <span className="fs-6 mt-1">
                                                <small className="badge badge-info">
                                                    {user.roles?.at(0)?.name}
                                                </small>
                                            </span>
                                        )}
                                        <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                                            <DetailsBtn
                                                onClick={() => {
                                                    navigate(`${user.id}`);
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
                            current_page: users?.current_page,
                            from: users?.from,
                            has_more_pages: users?.has_more_pages,
                            last_page: users?.last_page,
                            per_page: users?.per_page,
                            to: users?.to,
                            total: users?.total,
                            route: "users",
                        }}
                        setPage={() => {}}
                    />
                }
            </div>
        </>
    );
};

export default UsersIndex;
