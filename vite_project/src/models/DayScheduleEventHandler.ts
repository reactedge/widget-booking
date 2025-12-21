import {DayScheduleEvent, DaysType} from "@/components/event/types/event";

export class DayScheduleEventHandler {
    private day

    constructor(day: DaysType) {
        this.day = day.day
    }

    getDaySchedule = (events: DayScheduleEvent[]) => {
        const dayEvents = events.filter((event: DayScheduleEvent) => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList: DayScheduleEvent[] = []

        for (const time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            dayEventList.push(groupEventByTime[time][0])
        }

        return dayEventList
    }

    /**
     * Organise the events into an array whose keys are the different times for all the events
     * @param events
     */
    getStartTimeEvents = (events: DayScheduleEvent[]): Record<string, DayScheduleEvent[]> => {
        const getTimes = (times: Record<string, DayScheduleEvent[]>, event: DayScheduleEvent) => {
            const { startTime } = event;
            if (!times[startTime]) {
                times[startTime] = [];
            }
            times[startTime].push(event)

            return times
        }

        return events.reduce(getTimes, {})
    }
}