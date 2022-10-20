import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { matchRoutes, useLocation, useResolvedPath } from "react-router-dom";
import routes from "../../routes";

interface LinkType {
    to: string;
    exact?: boolean;
    className: string;
    activeClassName: string;
    inactiveClassName: string;
    children: ReactNode;
}

const NavLink: FC<LinkType> = ({ to, exact = false, className, activeClassName, inactiveClassName, children }) => {
    const location = useLocation();
    const resolvedLocation = useResolvedPath(to);
    const routeMatches = matchRoutes(routes, location);

    let isActive;
    if (exact) {
        isActive = location.pathname === resolvedLocation.pathname;
    } else {
        isActive =
            routeMatches === null ? false : routeMatches.some((match) => match.pathname === resolvedLocation.pathname);
    }

    const allClassNames = className.concat(" ", isActive ? `${activeClassName}` : `${inactiveClassName}`);

    return (
        <Link className={allClassNames.trim()} to={to}>
            {children}
        </Link>
    );
};

export default NavLink;
