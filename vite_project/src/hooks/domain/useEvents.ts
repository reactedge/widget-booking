// domain/hooks/useEvents.ts
import {useFilter} from "./useFilter.tsx";
import {useKeystoneEvents} from "../infra/useKeystoneEvents.tsx";
import type {FilterParams} from "../../types/domain/types.ts";
import {mapKeystoneEvent} from "../../lib/event.ts";
import type {IntentEvent, KeystoneEventFilter} from "../../types/domain/event.type.ts";

interface UseEventsResult {
    events: IntentEvent[] | undefined;
    eventsLoading: boolean;
    eventsError: Error | null;
    refetch: (filter: KeystoneEventFilter) => void;
}

export function useEvents(params: FilterParams | undefined): UseEventsResult {
    const filter = useFilter(params);

    const {
        keystoneEvents,
        loading,
        error,
        refetch,
    } = useKeystoneEvents(filter);

    const events = keystoneEvents ? keystoneEvents.map(mapKeystoneEvent)
        : undefined;

    return {
        events,
        eventsLoading: loading,
        eventsError: error,
        refetch,
    };
}
