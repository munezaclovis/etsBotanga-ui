import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../store/theme/context";
import NavLink from "../utilities/navLink";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../../store/auth/context";
import UserAvatar from "../../assets/img/user-avatar.png";
import "../../assets/vendor/metisMenu/metisMenu.css";
import { GiCargoShip, GiFizzingFlask } from "react-icons/gi";
import { IconType } from "react-icons";
import { RiDashboardLine } from "react-icons/ri";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { VscKey } from "react-icons/vsc";

const Sidebar = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    return (
        <>
            <div id="left-sidebar" className={`sidebar${theme.mobileSidebarOpen ? " mini_sidebar_on" : ""}`}>
                <div className="navbar-brand">
                    <Link to="/">
                        <span>Botanga</span>
                    </Link>
                    <button type="button" className="btn-toggle-offcanvas btn btn-sm float-right" onClick={() => {}}>
                        <i className="lnr lnr-menu icon-close"></i>
                    </button>
                </div>
                <div className="sidebar-scroll">
                    <div className="user-account d-flex ">
                        <div className="user_div">
                            <img src={UserAvatar} className="user-photo" alt="User Profile" />
                        </div>
                        <div className="dropdown">
                            <span>Welcome,</span>
                            <Dropdown className="m-0">
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                    className="user-name left_dropdown_btn"
                                >
                                    <strong>{user?.details?.name}</strong>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link className="dropdown-item" to="/page-profile">
                                        <i className="icon-user"></i>My Profile
                                    </Link>
                                    <Link className="dropdown-item" to="/">
                                        <i className="icon-settings"></i>Settings
                                    </Link>
                                    <li className="divider" />
                                    <Link className="dropdown-item" to="/login">
                                        <i className="icon-power"></i>Logout
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>
                            <ul className="dropdown-menu dropdown-menu-right account vivify flipInY"></ul>
                        </div>
                    </div>
                    <nav id="left-sidebar-nav" className="sidebar-nav">
                        <ul id="id-menu" className="metismenu">
                            {/* <SideBarItem icon={RiDashboardLine} link={""} title={"DashBoard"} /> */}
                            <SideBarItem
                                icon={IoStorefrontSharp}
                                link={"products"}
                                title={"Products"}
                                permission={"product:show"}
                            />
                            <SideBarItem
                                icon={GiFizzingFlask}
                                link={"ingredients"}
                                title={"Ingredients"}
                                permission={"ingredient:show"}
                            />
                            <SideBarItem
                                icon={GiCargoShip}
                                link={"orders"}
                                title={"Orders"}
                                permission={"order:show"}
                            />
                            <SideBarItem icon={FaUsers} link={"users"} title={"Users"} permission={"user:show"} />
                            <SideBarItem icon={VscKey} link={"roles"} title={"Roles"} permission={"role:show"} />
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

const SideBarItem = (data: { link: string; icon: IconType; title: string; permission?: string }) => {
    const { user } = useContext(AuthContext);

    if (!user.details?.roles?.find((x) => x.name === "super-admin")) {
        if (data.permission) {
            if (!user.details?.roles?.at(0)?.permissions?.find((x) => x.name === data.permission)) {
                return <></>;
            }
        }
    }

    return (
        <li>
            <NavLink to={data.link} exact={true} activeClassName="active" inactiveClassName="" className="">
                <data.icon className="fs-2" />
                <span>{data.title}</span>
            </NavLink>
        </li>
    );
};

export default Sidebar;
