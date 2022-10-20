export type IActionType = "SET_MOBILE_SIDEBAR" | "SET_MOBILE_HEADER" | "SET_REGISTRATION_KEY_MODAL" | "SET_RIGHTBAR";

export type IActionPayload = boolean;

export type ITheme = {
    mobileSidebarOpen: boolean;
    mobileHeaderOpen: boolean;
    registrationKeyModal: boolean;
    rightbar: boolean
};
