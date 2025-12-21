import type {EventHost, EventHostIndex} from "../types/domain/event.type.ts";

export function getEventHostIdsForEventType(
    eventTypeId: string,
    eventHosts: EventHostIndex[] = []
): string[] {
    return eventHosts
        .filter(host => host.eventTypeId === eventTypeId)
        .map(host => host.id);
}

export const getEventHostDetail = (eventHosts: EventHost[], eventHostId: string) => {
    const result = eventHosts.filter((eventHost: EventHost) => eventHost.id === eventHostId)
    return result[0]
}