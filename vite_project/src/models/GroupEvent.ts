import type {IntentEvent} from "../types/domain/event.type.ts";
import type {DayGroupEvent} from "../types/domain/dashboard.type.tsx";
import type {VisitIntentInfoState} from "../state/Intent/type.ts";
import type {EventType} from "../types/domain/types.ts";
import {getTime} from "../lib/date.ts";

export class GroupEventHandler {
    private groupEvent: DayGroupEvent

    private visitIntent: VisitIntentInfoState | undefined

    private eventType: EventType

    constructor(visitIntent: VisitIntentInfoState | undefined, eventType: EventType) {
        this.visitIntent = visitIntent
        this.eventType = eventType
        this.groupEvent = {
            name: '',
            day: '',
            venueName: '',
            status: '',
            startTime: '',
            eventHosts: [],
            orderedEventId: null,
            cartEvent: null,
            eventIds: []
        }
    }

    getGroupEvent = (events: IntentEvent[]) => {
        for (let i=0;i<events?.length;i++) {
            this.addEvent(events[i])
        }

        return this.groupEvent
    }

    addEvent = (event: IntentEvent) => {
        if (this.visitIntent === undefined) {
            console.warn('The user is not defined in class GroupEventHandler')
            return
        }

        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.start)}`
        this.groupEvent.venueName = event.venueName
        this.groupEvent.startTime = event.start

        this.groupEvent.eventType = this.eventType?.label

        this.groupEvent.eventHosts.push({
            eventHostId: event.host.id,
            eventId: event.id
        })
    }
}
