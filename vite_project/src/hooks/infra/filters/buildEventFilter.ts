import type {EventHostIds} from "../../../types/domain/types.ts";
import {AVAILABLE, type EventFilterState} from "../../../types/domain/event.type.ts";
import {getDayTimeEnd} from "../../../lib/date.ts";

interface BuildEventFilterParams {
    weekStart?: string;
    eventTypeId: string | null;
    venueId: string;
    eventHostIds: EventHostIds;
}

export function buildEventFilter(params: BuildEventFilterParams) {
    const filter: EventFilterState = {
        status: { equals: AVAILABLE },
    };

    if (!params.weekStart) return filter;

    if (params.venueId) {
        filter.venue = { id: { equals: params.venueId } };
    }

    const weekStartDate = new Date(params.weekStart);
    const endWeek = getDayTimeEnd(
        new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))
    );

    filter.startTime = { gte: params.weekStart };
    filter.endTime = { lte: endWeek };

    if (params.eventTypeId
        && (params?.eventHostIds && params?.eventHostIds?.length > 0)
    ) {
        filter.eventHost = { id: { in: params.eventHostIds } };
    }

    return filter;
}
