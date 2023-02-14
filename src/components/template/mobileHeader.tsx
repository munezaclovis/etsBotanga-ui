import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
    SET_MOBILE_HEADER,
    SET_MOBILE_SIDEBAR,
} from "../../store/theme/actions";
import { ThemeContext } from "../../store/theme/context";

const MobileHeader = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleSidebar = () => {
        setTheme(SET_MOBILE_SIDEBAR(!theme.mobileSidebarOpen));
        setTheme(SET_MOBILE_HEADER(false));
    };

    const toggleHeader = () => {
        setTheme(SET_MOBILE_HEADER(!theme.mobileHeaderOpen));
        setTheme(SET_MOBILE_SIDEBAR(false));
    };

    return (
        <div
            className={`lg:hidden items-center fixed top-0 right-0 left-0 z-[97] h-[55px] min-h-[55px] bg-[#1a1a27] text-slate-50  flex justify-between px-[15px]`}
        >
            <Link
                to={"/"}
                className="font-medium text-lg uppercase flex flex-row items-center"
            >
                Botanga
            </Link>
            <div className="flex flex-row items-center space-x-4">
                <button
                    className={`cursor-pointer outline-none align-middle${
                        theme.mobileSidebarOpen
                            ? " text-slate-100 lg:text-slate-400"
                            : " text-slate-400"
                    }`}
                    onClick={() => toggleSidebar()}
                >
                    <FontAwesomeIcon
                        icon={"face-smile-tongue"}
                        className="text-2xl font-light"
                    />
                </button>
                <button
                    className={`cursor-pointer hover:text-slate-100${
                        theme.mobileHeaderOpen
                            ? " text-slate-100 lg:text-slate-400"
                            : " text-slate-400"
                    }`}
                    onClick={() => toggleHeader()}
                >
                    <FontAwesomeIcon icon={faUserAlt} />
                </button>
            </div>
        </div>
    );
};

export default MobileHeader;
