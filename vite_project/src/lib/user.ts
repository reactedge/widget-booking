// domain/mapKeystoneUser.ts
import type {KeystoneAuthenticatedUser} from "../types/keystone/types.ts";
import type {UserIdentity} from "../types/domain/user.type.ts";

export function mapKeystoneUser(
    keystoneUser: KeystoneAuthenticatedUser
): UserIdentity {
    return {
        id: keystoneUser.id,
        email: keystoneUser.email,
        name: keystoneUser.name,

        eventHost: keystoneUser.eventHost ?? null,
        eventType: keystoneUser.eventType ?? null,
        eventTypeGroup: keystoneUser.eventTypeGroup ?? null,

        weekPreference: keystoneUser.weekPreference ?? null,

        cartItems: keystoneUser.cartItems ?? [],

        role: {
            isEventHost: keystoneUser.role?.isEventHost ?? false,
        },
    };
}
