import ICart from "../../models/cart/ICart";
import IAction from "../shared/IAction";
import { IActionPayload, IActionType } from "./IActionType";

export const cartInitState = {} as ICart;

const CartReducer = (state = cartInitState, action: IAction<IActionType, IActionPayload>): ICart => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                items: [...state.items],
            };
    }
    return {} as ICart;
};

export default CartReducer;
