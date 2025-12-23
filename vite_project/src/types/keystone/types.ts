// infra/keystone/types.ts

import type {ISODateString} from "../domain/event.type.ts";
import type {EventHostRef, EventTypeGroupRef, EventTypeRef, UserCartItem, UserRole} from "../../state/User/type.ts";

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

export interface KeystoneAuthenticatedUser {
    id: string;
    email: string;
    name: string;

    eventHost?: EventHostRef | null;
    eventType?: EventTypeRef | null;
    eventTypeGroup?: EventTypeGroupRef | null;

    weekPreference?: number | null;

    cartItems: UserCartItem[];

    role: UserRole;
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

export interface KeystoneEventCalculationParams {
    eventId?: string;
    eventTypeId?: string;
    shampoo?: 0 | 1;
}

export interface KeystoneAuthenticationParams {
    email?: string;
    password?: string;
}