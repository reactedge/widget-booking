import React from "react";
import {useVisitIntentState} from "../../../state/Intent/useVisitIntentState.ts";
import {useEvents} from "../../../hooks/domain/useEvents.ts";
import {Spinner} from "../../global/Spinner.tsx";
import {ErrorState} from "../../global/ErrorState.tsx";
import {NoEvent} from "./NoEvent.tsx";
import {WeekEvents} from "./WeekEvents.tsx";

export const GetWeekEventsForMobile: React.FC = () => {
    const { visitIntent } = useVisitIntentState();

    const {
        data,
        loading,
        error,
    } = useEvents({
        eventTypeId: visitIntent.eventTypeId,
        weekStart: visitIntent.weekIntent,
    });

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorState />;
    }

    if (!data || data.events.length === 0) {
        return <NoEvent />;
    }

    return <WeekEvents events={data.events} />;
}