import {useMemo} from "react";
import {
    type BookingWidgetConfig, readBookingHostConfig, readBookingSystemConfig,
} from "../BookingSystemConfig.tsx";
import type {UserConfig} from "../state/User/type.ts";

export function useWidgetConfig(host: HTMLElement): {
    booking: BookingWidgetConfig;
    user: UserConfig
} {
    return useMemo(() => {
        const system = readBookingSystemConfig();
        const hostConfig = readBookingHostConfig(host);

        return Object.freeze({
            booking: {
                api: system.widgets.booking!.api,
                venueId: hostConfig.venueId,
                cloudflareKey: system.integrations?.cloudflare?.siteKey,
            },
            user: {
                auth: system.widgets.booking!.auth,
            }
        });
    }, [host]);
}



