import IAction from "../shared/IAction";
import { IActionType, ITheme } from "./Types";

export const themeInitState: ITheme = {
    mobileHeaderOpen: false,
    mobileSidebarOpen: false,
    registrationKeyModal: false,
    rightbar: false,
};

export const ThemeReducer = (state = themeInitState, action: IAction<IActionType, boolean>): ITheme => {
    switch (action.type) {
        case "SET_MOBILE_SIDEBAR":
            return { ...state, mobileSidebarOpen: action.payload };
        case "SET_MOBILE_HEADER":
            return { ...state, mobileHeaderOpen: action.payload };
        case "SET_REGISTRATION_KEY_MODAL":
            return { ...state, registrationKeyModal: action.payload };
        case "SET_RIGHTBAR":
            return { ...state, rightbar: action.payload };
        default:
            return state;
    }
};
