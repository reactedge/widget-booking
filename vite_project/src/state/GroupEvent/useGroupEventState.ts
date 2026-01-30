import {useContext} from "react";
import {LocalGroupEventStateContext} from "./GroupEventState.tsx";
import type {EventState} from "./type.ts";

export function useGroupEventState(): EventState {
    const context = useContext(LocalGroupEventStateContext);
    if (!context) {
        throw new Error("useEventState must be used within EventStateProvider");
    }
    return context;
}