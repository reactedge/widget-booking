import type {UserIdentity} from "../../types/domain/user.type.ts";

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


export interface UserState {
    user: UserIdentity | null;
    loading: boolean;
    error?: Error | null;
    refreshUser: () => Promise<void>;
}

export interface EventHostRef {
    id: string;
    name: string;
}

export interface EventTypeRef {
    id: string;
    name: string;
}

export interface EventTypeGroupRef {
    id: string;
    name: string;
}

export interface UserCartItem {
    id: string;
    quantity: number;
    price: number;
    shampoo: boolean;

    eventType: {
        name: string;
    };

    event: {
        id: string;
        day: string;
        startTime: string;
        endTime: string;
        eventHost: EventHostRef;
    };
}

export interface UserRole {
    isEventHost: boolean;
}
