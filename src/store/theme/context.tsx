import React, { createContext, Dispatch, FC, useReducer } from "react";
import IPageProps from "../../models/shared/IPageProps";
import IAction from "../shared/IAction";
import { themeInitState, ThemeReducer } from "./reducer";
import { IActionPayload, IActionType, ITheme } from "./Types";

type IContext = {
    theme: ITheme;
    setTheme: Dispatch<IAction<IActionType, IActionPayload>>;
};

export const ThemeContext = createContext<IContext>({
    theme: themeInitState,
    setTheme: () => {},
});

const ThemeProvider: FC<IPageProps> = ({ children }) => {
    const [theme, setTheme] = useReducer(ThemeReducer, themeInitState);

    let value = { theme, setTheme };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
