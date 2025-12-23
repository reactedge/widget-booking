import {capitalise} from "./string.ts";
import {getDate, getTime} from "./date.ts";
import type {DayGroupEvent} from "../types/domain/dashboard.type.tsx";
import {
    AVAILABLE,
    IN_CART_EVENT,
    type EventStatus,
    PAST_EVENT,
    PURCHASED_EVENT,
    WALKIN, type IntentEvent
} from "../types/domain/event.type.ts";
import type {KeystoneEvent} from "../types/infra/keystone/types.ts";

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
        return IN_CART_EVENT
    }

    if (eventGroup?.orderedEventId !== null) {
        return PURCHASED_EVENT
    }

    if (eventGroup.status === WALKIN) {
        return WALKIN
    }

    return AVAILABLE
}

export function mapKeystoneGroupEvent(event: KeystoneEvent): IntentEvent {
    return {
        id: event.id,
        day: event.day,
        start: event.startTime,
        end: event.endTime,
        status: event.status as EventStatus,
        venueName: event.venue.name,
        host: event.eventHost,
        orderItem: event.orderItem
        //eventTypeId: event.orderItem.event.id,
    };
}
