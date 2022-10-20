import React from "react";

const FormErrorMessage = (data: { message?: string }) => {
    return (
        <>{data.message && <div className="m-b-25 border border-danger rounded text-danger">{data?.message}</div>}</>
    );
};

export default FormErrorMessage;
