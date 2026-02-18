import {useMemo} from "react";
import {
    type BookingWidgetConfig, readBookingConfig, readBookingIntegrationConfig,
} from "../BookingSystemConfig.tsx";
import type {UserConfig} from "../state/User/type.ts";
import {activity} from "../../activity";

export function useWidgetConfig(host: HTMLElement): {
    booking: BookingWidgetConfig;
    user: UserConfig
} {
    return useMemo(() => {
        const hostConfig = readBookingConfig(host);
        const integrationConfig = readBookingIntegrationConfig()

        const config = {
            booking: {
                api: hostConfig.integrations.api!.graphql,
                venueId: hostConfig.runtime.venue,
                cloudflareKey: integrationConfig.integrations?.cloudflare?.siteKey,
            },
            user: {
                auth: hostConfig.integrations.api!.auth,
            }
        }

        activity('bootstrap', 'Widget config', config);

        return Object.freeze(config);
    }, [host]);
}



