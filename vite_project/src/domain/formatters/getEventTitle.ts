import type {DayGroupEvent} from "../../types/domain/dashboard.type.tsx";
import {capitalise} from "../../lib/string.ts";
import {getDate, getTime} from "../../lib/date.ts";

export const getEventTitle = (event: DayGroupEvent) => {
    return `${capitalise(event.day)} ${getDate(event.startTime)} for ${capitalise(event.eventType)} at ${getTime(event.startTime)}`
}