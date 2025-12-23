// user/keystoneAuthenticatedUser.types.ts
import type {EventHostRef, EventTypeGroupRef, EventTypeRef, UserCartItem, UserRole} from "../../../domain/user.type.ts";

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

export interface KeystoneAuthenticationParams {
    email?: string;
    password?: string;
}
