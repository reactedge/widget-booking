// domain/types/Event.ts
export interface IntentEvent {
    id: string;
    day: string;
    start: string;   // ISO
    end: string;     // ISO
    label: string;
}

export type ISODateString = string;

export type KeystoneEventFilter = {
    status?: {
        equals?: EventStatus;
    };
    venue?: {
        id?: {
            equals?: string;
        };
    };
    startTime?: {
        gte?: ISODateString;
    };
    endTime?: {
        lte?: ISODateString;
    };
    eventHost?: {
        id?: {
            in?: string[];
        };
    };
};

export type EventStatus = "ACTIVE" | "CANCELLED" | "DRAFT";

export const AVAILABLE = 'open'

export interface EventHostIndex {
    id: string;          // eventHost id
    eventTypeId: string; // one supported event type
}

// domain/filters/EventFilterKeys.ts
export type EventFilterKey =
    | "status"
    | "venue"
    | "startTime"
    | "endTime"
    | "eventHost";

export type EventFilterState = Partial<Record<EventFilterKey, unknown>>;
