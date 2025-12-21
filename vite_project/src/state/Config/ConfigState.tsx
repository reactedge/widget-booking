import {createContext} from "react";
import type {ConfigInfoState, ConfigState} from "./type.ts";

export const readConfig = (): ConfigInfoState => {
    if (typeof window === "undefined") {
        return { venue: undefined, eventHosts: []};
    }

    try {
        const storedData = JSON.parse(localStorage.getItem("bookingSystemConfig") || "{}");
        return {
            venue: storedData.venue || undefined,
            eventHosts: storedData.eventHosts || "",
        };
    } catch (error) {
        console.log(error)
        return { venue: undefined, eventHosts: []};
    }
};

export const LocalConfigStateContext = createContext<ConfigState | undefined>(undefined);