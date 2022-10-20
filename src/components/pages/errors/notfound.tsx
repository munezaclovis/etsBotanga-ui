import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackgroundParticles from "../../utilities/BackgroundParticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <>
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
                            Oculux
                        </Link>
                    </div>
                    <div className="card page-400">
                        <div className="body">
                            <p className="lead my-4">
                                <span className="number left">404 </span>
                                <span className="text">
                                    Oops! <br />
                                    Page Not Found
                                </span>
                            </p>
                            <p>The page you were looking for could not be found</p>
                            <div className="margin-top-30 d-flex flex-column gap-2">
                                <div onClick={() => navigate(-1)} className="btn btn-round btn-default">
                                    <FontAwesomeIcon icon={faArrowLeft} /> <span>Go Back</span>
                                </div>
                                <Link to="/" className="btn btn-round btn-primary">
                                    <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <BackgroundParticles />
            </div>
        </>
    );
};

export default Notfound;
