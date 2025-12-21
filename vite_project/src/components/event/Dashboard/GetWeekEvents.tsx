import {useVisitIntentState} from "../../../state/Intent/useVisitIntentState.ts";
import {Spinner} from "../../global/Spinner.tsx";
import {ErrorState} from "../../global/ErrorState.tsx";
import {useEvents} from "../../../hooks/domain/useEvents.ts";
import {NoEvent} from "./NoEvent.tsx";
import {WeekEvents} from "./WeekEvents.tsx";
import {useConfigState} from "../../../state/Config/useConfigState.ts";

export function GetWeekEvents() {
    const { visitIntent } = useVisitIntentState();
    const { config } = useConfigState();

    const ready =
        visitIntent.eventTypeId !== null &&
        visitIntent.weekIntent !== null;

    const {
        events,
        eventsLoading,
        eventsError,
    } = useEvents(
        ready
            ? {
                eventTypeId: visitIntent.eventTypeId,
                weekStart: visitIntent.weekIntent,
                venue: config.venue.id,
                eventHostIds: config.eventHosts,
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
