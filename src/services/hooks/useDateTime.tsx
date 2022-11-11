import { FC } from "react";

export const useDateTime = (date: number | Date, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(
        "fr-CD",
        options && { hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
    ).format(date instanceof Date ? date : new Date(date));
};
