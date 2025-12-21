import {createContext} from "react";
import type {VisitIntentInfoState, VisitIntentState} from "./type.ts";

export const readUserIntent = (): VisitIntentInfoState => {
    if (typeof window === "undefined") {
        return { weekIntent: "", eventTypeId: "", eventTypeGroupId: "" };
    }

    try {
        const storedData = JSON.parse(localStorage.getItem("visitIntent") || "{}");
        return {
            weekIntent: storedData.weekIntent || "",
            eventTypeId: storedData.eventTypeId || "",
            eventTypeGroupId: storedData.eventTypeGroupId || "",
        };
    } catch (error) {
        console.log(error)
        return { weekIntent: "", eventTypeId: "", eventTypeGroupId: "" };
    }
};

export const LocalVisitIntentStateContext = createContext<VisitIntentState | undefined>(undefined);