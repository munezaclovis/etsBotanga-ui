import { ICartItem } from "../../models/cart/ICart";

export type IActionType = "ADD" | "REMOVE" | "LOAD";

export type IActionPayload = Partial<ICartItem> | Array<ICartItem>;
