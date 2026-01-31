import type {AuthenticatedUser} from "../../types/domain/user.type.ts";
import {activity} from "../../../activity";

export async function fetchUserFromBridge(): Promise<AuthenticatedUser | undefined> {
    const res = await fetch(`/auth/refresh-session`, {
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
export async function loginWithCredentials(email: string, password: string) {
    const res = await fetch('/auth/login', {
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