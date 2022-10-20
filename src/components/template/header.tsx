import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/theme/context";
import { AuthContext } from "../../store/auth/context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { GiHouseKeys, GiThreeKeys } from "react-icons/gi";
import { Button, Modal } from "react-bootstrap";
import { SET_REGISTRATION_KEY_MODAL, SET_RIGHTBAR } from "../../store/theme/actions";
import UserRegistrationCodeModal from "../modals/UserRegistrationCodeModal";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
    const {
        theme: { registrationKeyModal, rightbar },
        setTheme,
    } = useContext(ThemeContext);
    const { logout } = useContext(AuthContext);

    const progressBarStyle = {
        // height: "2px",
        // background: "#e91e63",
        width: "scrolled",
    };
    return (
        <>
            <nav className="navbar top-navbar">
                <div className="container-fluid">
                    <div className="navbar-left">
                        <div className="navbar-btn">
                            <Link to={""}>
                                <h4 className="img-fluid logo">Botanga</h4>
                            </Link>
                            <button type="button" className="btn-toggle-offcanvas" onClick={() => {}}>
                                <FontAwesomeIcon icon={faBars} className="lnr lnr-menu" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <ul className="nav navbar-nav">
                            <li>
                                <span
                                    onClick={() => {
                                        setTheme(SET_REGISTRATION_KEY_MODAL(!registrationKeyModal));
                                    }}
                                    className="icon-menu cursor-pointer"
                                    title="Search Result"
                                >
                                    <GiThreeKeys />
                                </span>
                            </li>
                            <li className="mx-2">
                                <span
                                    className="icon-menu cursor-pointer"
                                    onClick={() => {
                                        setTheme(SET_RIGHTBAR(!rightbar));
                                    }}
                                >
                                    <BsCart3 />
                                </span>
                            </li>
                            <li>
                                <div
                                    onClick={() => {
                                        logout();
                                    }}
                                    className="icon-menu pointer"
                                >
                                    <AiOutlinePoweroff />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="progress-container">
                    <div style={progressBarStyle} className="progress-bar" id="myBar"></div>
                </div>
            </nav>

            {registrationKeyModal && <UserRegistrationCodeModal />}
        </>
    );
};

export default Header;
