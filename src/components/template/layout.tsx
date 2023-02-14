import { useContext } from "react";
import { ToastContainer } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { SET_RIGHTBAR } from "../../store/theme/actions";
import { ThemeContext } from "../../store/theme/context";
import Rightbar from "./Rightbar";
import Header from "./header";
import Sidebar from "./sidebar";

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
