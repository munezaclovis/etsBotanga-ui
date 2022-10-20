import React, { ChangeEventHandler, Dispatch } from "react";

const Input = (
    data: {
        type?: string;
        className?: string;
        value: string;
        placeholder: string;
        name: string;
        autoComplete?: string;
        onChange?: ChangeEventHandler<HTMLInputElement>;
    },
    { ...rest }
) => {
    return (
        <input
            type={data.type ?? "text"}
            className={`${
                data.className ? data.className : ""
            } px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
            placeholder={data.placeholder ?? ""}
            autoComplete={data.autoComplete ?? "off"}
            name={data.name}
            value={data.value}
            onChange={data.onChange}
            {...rest}
        />
    );
};

export default Input;
