import React, { Dispatch } from "react";
import settings from "../../data/settings";

const getAccessToken = (): { token: string; setToken: Dispatch<string | null> } => {
    const token = localStorage.getItem(settings.access_token_name) ?? "";

    const setToken = (input: string | null) => {
        if (input !== null) localStorage.setItem(settings.access_token_name, input);
        else localStorage.removeItem(settings.access_token_name);
    };
    return { token, setToken };
};

export default getAccessToken;
