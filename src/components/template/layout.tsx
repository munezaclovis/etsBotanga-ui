import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../store/theme/context";
import Header from "./header";
import Rightbar from "./Rightbar";
import Sidebar from "./sidebar";
import { SET_RIGHTBAR } from "../../store/theme/actions";
import { ToastContainer } from "react-bootstrap";

const Layout = () => {
    const {
        setTheme,
        theme: { rightbar },
    } = useContext(ThemeContext);

    const closeCart = () => {
        if (rightbar) setTheme(SET_RIGHTBAR(false));
    };

    return (
        <div className="theme-indigo">
            <div
                className={`overlay${rightbar ? " open" : ""}`}
                onClick={() => {
                    closeCart();
                }}
            />
            <div id="wrapper">
                <Header />
                <Rightbar />
                <Sidebar />
                <div id="main-content">
                    <div className="container-fluid">
                        <div className="mt-3">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Layout;
