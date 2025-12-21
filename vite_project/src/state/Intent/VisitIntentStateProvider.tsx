import {type ReactNode, useCallback, useEffect, useRef} from "react";
import { useImmer } from "use-immer";
import type {EventTypeGroup} from "../../types/domain/types.ts";
import {LocalVisitIntentStateContext, readUserIntent} from "./VisitIntentState.tsx";
import type {VisitIntentInfoState} from "./type.ts";

const LocalStateProvider = LocalVisitIntentStateContext.Provider;

interface VisitIntentStateProviderProps {
    children: ReactNode;
    eventTypeGroups: EventTypeGroup[];
}

export const VisitIntentStateProvider: React.FC<VisitIntentStateProviderProps> = ({ children, eventTypeGroups }) => {
    const [state, setState] = useImmer<{ visitIntent: VisitIntentInfoState }>({
        visitIntent: readUserIntent(),
    });

    const initialized = useRef(false);

    // ✅ Keep state in sync with `localStorage` (Fixes Next.js navigation reset issue)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("visitIntent", JSON.stringify(state.visitIntent));
        }
    }, [state.visitIntent]);

    const updateIntent = useCallback((keyState: keyof VisitIntentInfoState, value: string) => {
        setState(draft => {
            draft.visitIntent[keyState] = value;
        });
    }, [setState]);

    const setWeekIntent = useCallback((value: string) => {
        updateIntent("weekIntent", value);
    }, [updateIntent]);

    const setEventType = useCallback((value: string) => {
        updateIntent("eventTypeId", value);
    }, [updateIntent]);

    const setEventTypeGroup = useCallback((value: string) => {
        updateIntent("eventTypeGroupId", value);
    }, [updateIntent]);

    const resetIntent = useCallback(() => {
        setState({ visitIntent: { weekIntent: "", eventTypeId: "", eventTypeGroupId: "" } });
        if (typeof window !== "undefined") {
            localStorage.removeItem("visitIntent");
        }
    }, [setState]);

    // ✅ Ensure `eventTypeGroups` is loaded before setting `eventTypeGroupId` (Fix for undefined state issue)
    useEffect(() => {
        if (initialized.current || !eventTypeGroups || eventTypeGroups.length === 0) return;

        setEventTypeGroup(eventTypeGroups[0].id);

        initialized.current = true;
    }, [eventTypeGroups, setEventTypeGroup]);

    return (
        <LocalStateProvider
            value={{
                setWeekIntent,
                setEventType,
                setEventTypeGroup,
                resetIntent,
                visitIntent: state.visitIntent,
            }}
        >
            {children}
        </LocalStateProvider>
    );
};
