import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (data: { title: string }) => {
    return (
        <div className="col-md-6 col-sm-12">
            <h1 className="fs-2">{data.title}</h1>
            <nav aria-label="breadcrumb" className="d-none">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Botanga</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        My Page
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default BreadCrumb;
