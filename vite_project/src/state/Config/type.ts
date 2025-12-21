import type {EventHostIds, EventTypeGroup, Venue} from "../../types/domain/types.ts";

export interface ConfigInfoState {
    venue: Venue;
    eventHosts: EventHostIds;
    eventTypeGroups: EventTypeGroup[];
}

export interface ConfigState {
    config: ConfigInfoState;
    setVenue: (value: Venue) => void;
    setEventHosts: (value: EventHostIds) => void;
}