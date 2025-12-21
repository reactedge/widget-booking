import {type ReactNode, useCallback, useEffect, useRef} from "react";
import { useImmer } from "use-immer";
import {LocalEventStateContext} from "./EventState.tsx";
import type {EventInfoState} from "./type.ts";

const LocalStateProvider = LocalEventStateContext.Provider;

const intialState: EventInfoState = {
    activeEventId: '',
    shampoo: false,
}

interface EventStateProviderProps {
    children: ReactNode;
    eventGroup?: { eventHosts: { eventId: string }[] };
}

export const EventStateProvider: React.FC<EventStateProviderProps> = ({ children, eventGroup }) => {
    const [state, setState] = useImmer<EventInfoState>(intialState);
    const initialised = useRef(false)

    const toggleActiveEvent = useCallback((id: string) => {
        setState(draft => { draft.activeEventId = id });
    }, [setState]);

    const resetActiveEvent = useCallback(() => {
        setState(draft => { draft.activeEventId = undefined });
    },[setState]);

    const toggleShampooEvent = useCallback(() => {
        setState(draft => { draft.shampoo = !draft.shampoo });
    },[setState]);

    // 🔥 Initialize activeEventId if only one eventHost exists
    useEffect(() => {
        if (initialised.current) return;

        if (eventGroup?.eventHosts?.length === 1 && !state.activeEventId) {
            setState(draft => {
                draft.activeEventId = eventGroup.eventHosts[0].eventId;
            });
            initialised.current = true
        }
    }, [eventGroup?.eventHosts, setState, state.activeEventId]); // Dependencies ensure it runs only when needed

    return <LocalStateProvider
        value={{
            resetActiveEvent,
            toggleActiveEvent,
            toggleShampooEvent,
            eventState: state
        }}
    >{children}</LocalStateProvider>
}
