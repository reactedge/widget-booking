import type {EventHostIndex} from "../types/domain/event.type.ts";

export function getEventHostIdsForEventType(
    eventTypeId: string,
    eventHosts: EventHostIndex[] = []
): string[] {
    return eventHosts
        .filter(host => host.eventTypeId === eventTypeId)
        .map(host => host.id);
}
