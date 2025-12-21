// infra/keystone/types.ts

import type {ISODateString} from "../domain/event.type.ts";

export interface KeystoneEventTypeGroup {
    id: string;
    name: string;
    description?: string | null;
}

export interface KeystoneEventType {
    id: string;
    name: string;
    description?: string | null;
}

export interface KeystoneEventHost {
    id: string;
    name: string;
    eventTypesRef: string[];
}

export interface KeystoneEvent {
    id: string;
    startTime: ISODateString;
    endTime: ISODateString;
    day: string;
    status: string;
    venue: {
        name: string;
    };
    eventHost: {
        id: string;
        name: string;
    };
    orderItem: OrderItemEventRef;
}

export interface OrderItemEventRef {
    event: {
        id: string;
    };
}

export interface KeystoneVenue{
    id: string;
    name: string;
}

export interface VenueEventTypeGroupsQueryResult {
    venueEventTypeGroups: KeystoneEventTypeGroup[];
}

export interface KeystoneUser {
    id: string
    email: string
    name: string
    eventType?: KeystoneEventType
    eventHost?: Pick<KeystoneEventHost, 'id'>
    weekPreference: string
    cartItems: KeystoneCartItem[]
    eventTypeGroup: KeystoneEventTypeGroup
    role: {
        isEventHost: boolean
    }
}

export interface KeystoneCartItem {
    id: string
    quantity: number
    price: number
    eventType: {
        name: string
    }
    shampoo: boolean
    event: KeystoneEvent
}