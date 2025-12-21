import type {KeystoneEvent} from "../types/keystone/types.ts";
import type {EventStatus, IntentEvent} from "../types/domain/event.type.ts";

export function mapKeystoneEvent(event: KeystoneEvent): IntentEvent {
    return {
        id: event.id,
        day: event.day,
        startTime: event.startTime,
        endTime: event.endTime,
        status: event.status as EventStatus,
        venueName: event.venue.name,
        hostName: event.eventHost.name,
        eventTypeId: event.orderItem.event.id,
    };
}
