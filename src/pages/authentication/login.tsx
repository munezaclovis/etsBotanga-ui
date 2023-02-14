import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormErrorMessage from "../../components/form/FormErrorMessage";
import InputErrors from "../../components/form/InputErrors";
import LoadingSpinner from "../../components/utilities/LoadingSpinner";
import { IAuthCredentials } from "../../models/auth/IAuth";
import { AuthContext } from "../../store/auth/context";
const Login = () => {
    const [state, setState] = useState<IAuthCredentials>(
        {} as IAuthCredentials
    );
    const navigate = useNavigate();

    const { user, login, resetErrors } = useContext(AuthContext);

    useEffect(() => {
        if (user?.errors?.for === "register") {
            resetErrors();
        }
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(
            {
                username: state.username ?? "",
                password: state.password ?? "",
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
                    <p className="lead">Login to your account</p>
                    <form
                        className="form-auth-small m-t-25"
                        onSubmit={onSubmit}
                    >
                        <FormErrorMessage message={user?.errors?.message} />
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control round"
                                placeholder="username"
                                name="username"
                                autoComplete="username"
                                value={state.username ?? ""}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        username: e.target.value,
                                    })
                                }
                            />
                            <InputErrors
                                errors={user?.errors?.fields?.username}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control round"
                                placeholder="password"
                                name="password"
                                autoComplete="password"
                                value={state.password ?? ""}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <InputErrors
                                errors={user?.errors?.fields?.password}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-round w-100"
                            disabled={user.loading}
                        >
                            {user.loading && (
                                <span className="fs-6 m-r-5">
                                    <LoadingSpinner />
                                </span>
                            )}
                            LOGIN
                        </button>
                        <div className="bottom">
                            <span className="helper-text m-b-5 d-flex justify-content-center align-items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="font-11"
                                />
                                <Link to="/forgotpassword">
                                    Forgot password?
                                </Link>
                            </span>
                            <span>
                                Don't have an account?{" "}
                                <Link to="/register">Register</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h3 className="text-slate-500 text-xl font-bold">Sign in</h3>
                                </div>
                                <hr className="mt-6 border-b-1 border-slate-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onClick={onSubmit}>
                                    <FormErrorMessage message={user?.errors?.message} />
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Username
                                        </label>
                                        <Input
                                            type="text"
                                            className={`${
                                                user?.errors?.fields?.username ? " border border-red-500" : ""
                                            }`}
                                            placeholder="username"
                                            name="username"
                                            autoComplete="username"
                                            value={state.username ?? ""}
                                            onChange={(e) => setState({ ...state, username: e.target.value })}
                                        />
                                        <InputErrors errors={user?.errors?.fields?.username} />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <Input
                                            type={`${passwordVisible ? "text" : "password"}`}
                                            className={`${
                                                user?.errors?.fields?.password ? " border border-red-500" : ""
                                            }`}
                                            placeholder="password"
                                            name="password"
                                            autoComplete="password"
                                            value={state.password ?? ""}
                                            onChange={(e) => setState({ ...state, password: e.target.value })}
                                        />
                                        <InputErrors errors={user?.errors?.fields?.password} />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="flex items-center justify-center bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Sign In
                                            {user?.loading && <VscLoading className="animate-spin h-3 ml-2" />}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link to="/forgot-password" className="text-slate-200 hover:text-blue-500">
                                    <small>Forgot password?</small>
                                </Link>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link to="/register" className="text-slate-200 hover:text-blue-500">
                                    <small>Create new account</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Login;
