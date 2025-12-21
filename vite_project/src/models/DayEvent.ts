import type {DaysType} from "../types/domain/bookingsystem.type.ts";
import type {DayGroupEvent} from "../types/domain/dashboard.type.tsx";
import type {UserIdentity} from "../types/domain/user.type.ts";
import {DayGroupEventHandler} from "./DayGroupEvent.ts";
import type {IntentEvent} from "../types/domain/event.type.ts";

export class DayEventHandler {
    private day

    constructor(day: DaysType) {
        this.day = day.day
    }

    getDayEvents = (events: IntentEvent[], user: UserIdentity | undefined) => {
        const dayEvents = events.filter(event => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList: DayGroupEvent[] = []

        for (const time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            const listEvents = groupEventByTime[time]
            dayEventList.push(this.getDayGroupEvent(listEvents, time, user))
        }

        return dayEventList
    }

    getDaySchedule = (events: IntentEvent[]) => {
        const dayEvents = events.filter((event: IntentEvent) => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList = []

        for (const time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            dayEventList.push(groupEventByTime[time][0])
        }

        return dayEventList
    }

    getDayGroupEvent = (
        listEvents: IntentEvent[],
        time: string,
        user: UserIdentity | undefined
    ): DayGroupEvent => {
        const dayGroupEventHandler = new DayGroupEventHandler(time, user)

        for (const index in listEvents) {
            if (!listEvents.hasOwnProperty(index)) continue;
            dayGroupEventHandler.addEvent(listEvents[index])
        }

        return dayGroupEventHandler.getGroupEvent()
    }

    /**
     * Organise the events into an array whose keys are the different times for all the events
     * @param events
     */
    getStartTimeEvents = (events: IntentEvent[]): Record<string, IntentEvent[]> => {
        const getTimes = (times: Record<string, IntentEvent[]>, event: IntentEvent) => {
            const { start } = event;
            if (!times[start]) {
                times[start] = [];
            }
            times[start].push(event)

            return times
        }

        return events.reduce(getTimes, {})
    }
}