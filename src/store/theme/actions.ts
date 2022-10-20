import IAction from "../shared/IAction";
import { IActionType } from "./Types";

export const SET_MOBILE_SIDEBAR = (e: boolean): IAction<IActionType, boolean> => {
    return {
        type: "SET_MOBILE_SIDEBAR",
        payload: e,
    };
};

export const SET_MOBILE_HEADER = (e: boolean): IAction<IActionType, boolean> => {
    return {
        type: "SET_MOBILE_HEADER",
        payload: e,
    };
};

export const SET_RIGHTBAR = (e: boolean): IAction<IActionType, boolean> => {
    return {
        type: "SET_RIGHTBAR",
        payload: e,
    };
};

export const SET_REGISTRATION_KEY_MODAL = (e: boolean): IAction<IActionType, boolean> => {
    return {
        type: "SET_REGISTRATION_KEY_MODAL",
        payload: e,
    };
};
