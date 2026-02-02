
export interface BookingWidgetConfig {
    api: string;
    venueId: string;
    cloudflareKey?: string;
}

interface BookingSystemConfig {
    widgets: {
        booking?: {
            api: string;
            auth: string;
        };
    };
    integrations?: {
        cloudflare?: {
            siteKey: string;
        };
    };
}


interface BookingHostConfig {
    venueId: string
}

export function readBookingSystemConfig(): BookingSystemConfig {
    const root = document.getElementById('reactedge-config');
    if (!root?.textContent) {
        throw new Error('BookingWidget: reactedge-config not found');
    }

    let config: BookingSystemConfig;
    try {
        config = JSON.parse(root.textContent);
    } catch {
        throw new Error('BookingWidget: reactedge-config contains invalid JSON');
    }

    if (!config.widgets?.booking?.api) {
        throw new Error('BookingWidget: booking.api missing in global config');
    }

    if (!config.widgets?.booking?.auth) {
        throw new Error('BookingWidget: booking.auth missing in global config');
    }

    return config;
}

export function readBookingHostConfig(host: HTMLElement): BookingHostConfig {
    const venueId = host.getAttribute('data-venue');

    if (!venueId) {
        throw new Error('BookingWidget: data-venue attribute missing');
    }

    return Object.freeze({ venueId });
}