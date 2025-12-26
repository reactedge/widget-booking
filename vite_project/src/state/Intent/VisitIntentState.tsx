import {createContext} from "react";
import type {VisitIntentInfoState, VisitIntentState} from "./type.ts";

export const readVisitIntent = (): VisitIntentInfoState => {
    if (typeof window === "undefined") {
        return { weekIntent: "", eventTypeId: "", eventTypeGroupId: "", hostId: "" };
    }

    try {
        const storedData = JSON.parse(localStorage.getItem("visitIntent") || "{}");
        return {
            weekIntent: storedData.weekIntent || "",
            eventTypeId: storedData.eventTypeId || "",
            eventTypeGroupId: storedData.eventTypeGroupId || "",
            hostId: storedData.hostId || ""
        };
    } catch (error) {
        console.log(error)
        return { weekIntent: "", eventTypeId: "", eventTypeGroupId: "", hostId: "" };
    }
};

export const LocalVisitIntentStateContext = createContext<VisitIntentState | undefined>(undefined);