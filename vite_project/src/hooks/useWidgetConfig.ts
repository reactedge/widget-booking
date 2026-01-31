import {useMemo} from "react";
import {
    type BookingWidgetConfig, readBookingHostConfig, readBookingSystemConfig,
} from "../BookingSystemConfig.tsx";

export function useWidgetConfig(host: HTMLElement): {
    booking: BookingWidgetConfig;
} {
    return useMemo(() => {
        const system = readBookingSystemConfig();
        const hostConfig = readBookingHostConfig(host);

        return Object.freeze({
            booking: {
                api: system.widgets.booking!.api,
                venueId: hostConfig.venueId,
                cloudflareKey: system.integrations?.cloudflare?.siteKey,
            }
        });
    }, [host]);
}



