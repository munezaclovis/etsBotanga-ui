import { IUser } from "../../models/shared/user/IUser";
import IAction from "../shared/IAction";
import { IActionPayload, IActionType } from "./IActionType";

export const SET_USER = (e: IUser): IAction<IActionType, IActionPayload> => {
    return {
        type: "USER",
        payload: e,
    };
};

export const SET_ACCESS_TOKEN = (e: { access_token: string }): IAction<IActionType, IActionPayload> => {
    return {
        type: "ACCESS_TOKEN",
        payload: e,
    };
};

export const RESET_USER = (): IAction<IActionType, IActionPayload> => {
    return {
        type: "RESET",
        payload: undefined,
    };
};

export const DESTROY_USER = RESET_USER;
