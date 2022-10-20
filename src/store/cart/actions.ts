import { ICartItem } from "../../models/cart/ICart";
import IAction from "../shared/IAction";
import { IActionPayload, IActionType } from "./IActionType";

export const AddToCart = (e: { id: string }): IAction<IActionType, IActionPayload> => {
    return {
        type: "ADD",
        payload: e,
    };
};

export const RemoveFromCart = (e: { id: string }): IAction<IActionType, IActionPayload> => {
    return {
        type: "REMOVE",
        payload: e,
    };
};

export const LoadCart = (e: Array<ICartItem>): IAction<IActionType, IActionPayload> => {
    return {
        type: "LOAD",
        payload: e,
    };
};
