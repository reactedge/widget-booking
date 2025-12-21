import {capitalise} from "./string.ts";
import {getDate, getTime} from "./date.ts";
import type {DayGroupEvent} from "../types/domain/dashboard.type.tsx";
import {
    AVAILABLE,
    BOOKED_EVENT,
    type EventStatus,
    PAST_EVENT,
    PURCHASED_EVENT,
    WALKIN
} from "../types/domain/event.type.ts";

export const getEventTitle = (event: DayGroupEvent) => {
    return `${capitalise(event.day)} ${getDate(event.startTime)} for ${capitalise(event.eventType)} at ${getTime(event.startTime)}`
}

export const isPastEvent = (eventGroup: DayGroupEvent) => {
    const date = new Date()
    const eventDate = new Date(eventGroup?.startTime)
    return eventDate < date
}

export const groupEventStatus = (eventGroup: DayGroupEvent): EventStatus => {
    if (isPastEvent(eventGroup)) {
        return PAST_EVENT
    }

    if (eventGroup?.cartEvent !== null) {
        return BOOKED_EVENT
    }

    if (eventGroup?.orderedEventId !== null) {
        return PURCHASED_EVENT
    }

    if (eventGroup.status === WALKIN) {
        return WALKIN
    }

    return AVAILABLE
}