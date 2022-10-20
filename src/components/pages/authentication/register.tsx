import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { IAuthCredentials } from "../../../models/auth/IAuth";
import { AuthContext } from "../../../store/auth/context";
import FormErrorMessage from "../../form/FormErrorMessage";
import InputErrors from "../../form/InputErrors";
import LoadingSpinner from "../../utilities/LoadingSpinner";

const Register = () => {
    const [state, setState] = useState<IAuthCredentials>({} as IAuthCredentials);
    const navigate = useNavigate();

    const { user, register, resetErrors } = useContext(AuthContext);

    useEffect(() => {
        if (user?.errors?.for === "login") {
            resetErrors();
        }
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        register(
            {
                name: state.name ?? "",
                username: state.username ?? "",
                password: state.password ?? "",
                password_confirmation: state.password_confirmation ?? "",
                code: state.code ?? "",
            },
            () => {
                navigate("/", { replace: true });
            }
        );
    };
    return (
        <>
            <div className="card">
                <div className="body">
                    <p className="lead">Register</p>
                    <form className="form-auth-small m-t-25" onSubmit={onSubmit}>
                        <FormErrorMessage message={user?.errors?.message} />
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control round${user?.errors?.fields?.name ? " border-danger" : ""}`}
                                placeholder="name"
                                name="name"
                                autoComplete="off"
                                value={state.name ?? ""}
                                onChange={(e) => setState({ ...state, name: e.target.value })}
                            />
                            <InputErrors errors={user?.errors?.fields?.name} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control round${
                                    user?.errors?.fields?.username ? " border-danger" : ""
                                }`}
                                placeholder="username"
                                name="username"
                                autoComplete="off"
                                value={state.username ?? ""}
                                onChange={(e) => setState({ ...state, username: e.target.value })}
                            />
                            <InputErrors errors={user?.errors?.fields?.username} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className={`form-control round${
                                    user?.errors?.fields?.password ? " border-danger" : ""
                                }`}
                                placeholder="Password"
                                name="password"
                                autoComplete="new-password"
                                value={state.password ?? ""}
                                onChange={(e) => setState({ ...state, password: e.target.value })}
                            />
                            <InputErrors errors={user?.errors?.fields?.password} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className={`form-control round${
                                    user?.errors?.fields?.password ? " border-danger" : ""
                                }`}
                                placeholder="Password confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                value={state.password_confirmation ?? ""}
                                onChange={(e) => setState({ ...state, password_confirmation: e.target.value })}
                            />
                            <InputErrors errors={user?.errors?.fields?.password_confirmation} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control round${user?.errors?.fields?.code ? " border-danger" : ""}`}
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                name="code"
                                autoComplete="off"
                                value={state.code ?? ""}
                                onChange={(e) => setState({ ...state, code: e.target.value })}
                            />
                            <InputErrors errors={user?.errors?.fields?.code} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-round w-100" disabled={user.loading}>
                            {user.loading && (
                                <span className="fs-6 m-r-5">
                                    <LoadingSpinner />
                                </span>
                            )}
                            Register
                        </button>
                        <div className="bottom">
                            <span>
                                Already have an account? <Link to="/login">Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
