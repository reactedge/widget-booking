import type {AuthenticatedUser} from "../../types/domain/user.type.ts";
import {activity} from "../../../activity";
import type {UserConfig} from "../../state/User/type.ts";

export async function fetchUserFromBridge(config: UserConfig): Promise<AuthenticatedUser | undefined> {
    const res = await fetch(`${config.auth}/auth/refresh-session`, {
        method: 'POST',
        credentials: 'include',
    });

    activity('session-read', 'Session Read', res);

    // Real failure
    if (!res.ok) {
        return undefined;
    }

    const json = await res.json();
    return json.user ?? undefined;
}

// auth.api.ts
export async function loginWithCredentials(email: string, password: string, config: UserConfig) {
    const res = await fetch(`${config.auth}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    activity('login', 'Login', res);

    if (!res.ok) {
        throw new Error('Login failed');
    }
}