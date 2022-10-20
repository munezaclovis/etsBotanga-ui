import { IUser } from "../../models/shared/user/IUser";

export type IActionType = "USER" | "RESET" | "DESTROY" | "ACCESS_TOKEN";

export type IActionPayload = undefined | { access_token: string } | IUser;
