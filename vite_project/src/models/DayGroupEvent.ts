import type {DayGroupEvent} from "../types/domain/dashboard.type.tsx";
import type {UserIdentity} from "../types/domain/user.type.ts";
import {getTime} from "../lib/date.ts";
import {isEventInCart} from "../lib/cart.ts";
import type {IntentEvent} from "../types/domain/event.type.ts";

export class DayGroupEventHandler {
    private groupEvent: DayGroupEvent

    private user: UserIdentity | undefined

    constructor(time: string, user?: UserIdentity | undefined) {
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
        this.groupEvent.startTime = time
        this.user = user
    }

    addEvent = (event: IntentEvent) => {
        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.start)}`
        this.groupEvent.venueName = event.venueName

        this.groupEvent.eventHosts.push({
            eventHostId: event.host.id,
            eventId: event.id
        })

        if (event.orderItem?.event) {
            this.groupEvent.orderedEventId = event.id
        }

        if (this.user && isEventInCart(this.user.cartItems, event.id)) {
            this.groupEvent.cartEvent = event
        }

        this.groupEvent.eventIds.push(event.id)
    }

    getGroupEvent = () => {
        return this.groupEvent
    }
}