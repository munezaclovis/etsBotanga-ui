import { faCreditCardAlt, faDeleteLeft, faUpDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IPaginate from "../../../models/pagination/IPaginate";
import IRole from "../../../models/role/IRole";
import getApi from "../../../services/api/getApi";
import PaginationLinks from "../../table/PaginateLinks";
import BreadCrumb from "../../utilities/BreadCrumb";

const RolesIndex = () => {
    const [roles, setRoles] = useState<IPaginate & { data: IRole[] }>();
    const api = getApi();

    useEffect(() => {
        api.get("roles").then((e) => setRoles(e.data));
    }, []);

    return (
        <>
            <BreadCrumb title="Roles" />
            <div className="row clearfix">
                {roles?.data &&
                    roles?.data.map((role, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="card c_grid c_indigo shadow-sm">
                                    <div className="body text-center d-flex flex-column">
                                        <h6 className="m-t-20">{role.name}</h6>
                                        <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                                            <button className="btn btn-outline-secondary btn-sm">Details</button>
                                            <button className="btn btn-outline-danger btn-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {
                    <PaginationLinks
                        data={{
                            current_page: roles?.current_page,
                            from: roles?.from,
                            has_more_pages: roles?.has_more_pages,
                            last_page: roles?.last_page,
                            per_page: roles?.per_page,
                            to: roles?.to,
                            total: roles?.total,
                            route: "roles",
                        }}
                        setPage={() => {}}
                    />
                }
            </div>
        </>
    );
};

export default RolesIndex;
