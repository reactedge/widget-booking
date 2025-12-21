import {useVisitIntentState} from "../../../state/Intent/useVisitIntentState.ts";
import {Spinner} from "../../global/Spinner.tsx";
import {ErrorState} from "../../global/ErrorState.tsx";
import {useEvents} from "../../../hooks/domain/useEvents.ts";
import {NoEvent} from "./NoEvent.tsx";
import {WeekEvents} from "./WeekEvents.tsx";
import {useConfigState} from "../../../state/Config/useConfigState.ts";
import {useMemo} from "react";

export function GetWeekEvents() {
    const { visitIntent } = useVisitIntentState();
    const { config, getEventHostIds } = useConfigState();

    const ready =
        visitIntent.eventTypeId !== null &&
        visitIntent.weekIntent !== null;
    const hostsIds = useMemo(
        () => getEventHostIds(),
        [getEventHostIds]
    );

    const {
        events,
        eventsLoading,
        eventsError,
    } = useEvents(
        ready
            ? {
                eventTypeId: visitIntent.eventTypeId,
                weekStart: visitIntent.weekIntent,
                venue: config?.venue?.id,
                eventHostIds: hostsIds,
            }
            : undefined
    );

    if (!ready || eventsLoading) {
        return <Spinner />;
    }

    if (eventsError) {
        return <ErrorState />;
    }

    if (!events || events.length === 0) {
        return <NoEvent />;
    }

    return <WeekEvents events={events} />;
}
