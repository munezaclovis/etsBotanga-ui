//@ts-nocheck
import { IUser } from "../../models/shared/user/IUser";
import IAction from "../shared/IAction";
import { IActionPayload, IActionType } from "./IActionType";

export type IContextState = {
    token: { access_token: string };
    data: IUser;
};
export const userInitState = {} as IContextState;

export const UserReducer = (state = userInitState, action: IAction<IActionType, IActionPayload>): IContextState => {
    switch (action.type) {
        case "USER":
            try {
                return {
                    ...state,
                    data: {
                        id: action.payload.id,
                        name: action.payload.name,
                        email: action.payload.email,
                        updated_at: action.payload.updated_at,
                        created_at: action.payload.created_at,
                        role: action.payload.role,
                    },
                };
            } catch {
                throw new Error("not compatible");
            }

        case "ACCESS_TOKEN":
            try {
                return {
                    ...state,
                    token: {
                        access_token: action.payload.access_token,
                    },
                };
            } catch {
                throw new Error("not compatible");
            }

        case "RESET":
        case "DESTROY":
            return {} as IContextState;

        default:
            return state;
    }
};
