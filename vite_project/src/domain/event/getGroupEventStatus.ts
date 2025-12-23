import type {DayGroupEvent} from "../../types/domain/dashboard.type.tsx";
import {
    AVAILABLE,
    type EventStatus,
    IN_CART_EVENT,
    PAST_EVENT,
    PURCHASED_EVENT,
    WALKIN
} from "../../types/domain/event.type.ts";
import {isPastEvent} from "./isPastEvent.ts";

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

export const groupEventStatusLabel = (eventGroup: DayGroupEvent): string => {
    if (isPastEvent(eventGroup)) {
        return 'Too late'
    }

    if (eventGroup?.cartEvent !== null) {
        return 'In cart'
    }

    if (eventGroup?.orderedEventId !== null) {
        return 'Was booked'
    }

    if (eventGroup.status === WALKIN) {
        return 'Walk-In'
    }

    return 'Available'
}