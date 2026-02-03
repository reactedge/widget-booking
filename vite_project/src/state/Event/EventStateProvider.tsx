import {type ReactNode, useCallback, useEffect, useRef} from "react";
import { useImmer } from "use-immer";
import {LocalEventStateContext, readActiveEvent} from "./EventState.tsx";
import type {EventInfoState} from "./type.ts";

const LocalStateProvider = LocalEventStateContext.Provider;

interface EventStateProviderProps {
    children: ReactNode;
    eventGroup?: { eventHosts: { eventId: string }[] };
}

export const EventStateProvider: React.FC<EventStateProviderProps> = ({ children, eventGroup }) => {
    const [state, setState] = useImmer<{ eventState: EventInfoState }>({
        eventState: readActiveEvent(),
    });
    const initialised = useRef(false)

    // ✅ Keep state in sync with `localStorage` (Fixes Next.js navigation reset issue)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("eventState", JSON.stringify(state.eventState));
        }
    }, [state.eventState]);

    const updateState = useCallback(
        <K extends keyof EventInfoState>(
            key: K,
            value: EventInfoState[K]
        ) => {
            setState(draft => {
                draft.eventState[key] = value;
            });
        },
        []
    );

    const toggleActiveEvent = useCallback((value: string) => {
        updateState("activeEventId", value);
    }, [updateState]);

    const resetActiveEvent = useCallback(() => {
        updateState("activeEventId", undefined);
    }, [updateState]);

    const toggleShampooEvent = useCallback(() => {
        setState(draft => {
            draft.eventState['shampoo'] = !draft.eventState['shampoo'];
        });
    }, [updateState]);

    // 🔥 Initialize activeEventId if only one eventHost exists
    useEffect(() => {
        if (initialised.current) return;

        if (eventGroup?.eventHosts?.length === 1 && !state.eventState.activeEventId) {
            toggleActiveEvent(eventGroup.eventHosts[0].eventId)
            initialised.current = true
        }
    }, [eventGroup?.eventHosts, setState, state.eventState.activeEventId]); // Dependencies ensure it runs only when needed

    return <LocalStateProvider
        value={{
            resetActiveEvent,
            toggleActiveEvent,
            toggleShampooEvent,
            eventState: state.eventState
        }}
    >{children}</LocalStateProvider>
}
