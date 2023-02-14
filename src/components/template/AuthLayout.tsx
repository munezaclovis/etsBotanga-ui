import { Link, Outlet } from "react-router-dom";
import BackgroundParticles from "../utilities/BackgroundParticles";

const AuthLayout = () => {
    return (
        <div className="theme-indigo">
            <div className="pattern">
                <span className="red"></span>
                <span className="indigo"></span>
                <span className="blue"></span>
                <span className="green"></span>
                <span className="orange"></span>
            </div>
            <div className="auth-main particles_js">
                <div className="auth_div vivify popIn">
                    <div className="auth_brand">
                        <Link className="navbar-brand" to="/">
                            Botanga
                        </Link>
                    </div>
                    <Outlet />
                </div>
                <BackgroundParticles />
            </div>
        </div>
    );
};

export default AuthLayout;
