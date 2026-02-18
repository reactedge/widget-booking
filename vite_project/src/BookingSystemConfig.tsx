
export interface BookingWidgetConfig {
    api: string;
    venueId: string;
    cloudflareKey?: string;
}

interface BookingConfig {
    runtime: {
        venue: string
    };
    integrations: {
        api?: {
            graphql: string;
            auth: string;
        },
        cloudflare?: {
            siteKey: string;
        };
    };
}

interface BookingIntegrationConfig {
    integrations: {
        cloudflare: {
            siteKey: string;
        }
    }
}

export function readBookingConfig(hostElement: HTMLElement): BookingConfig {
    const configScript = hostElement.querySelector<HTMLScriptElement>(
        'script[type="application/json"][data-config]'
    );

    if (!configScript) {
        throw new Error("Booking widget requires a <script data-config> block.");
    }

    let config: BookingConfig;
    try {
        config = JSON.parse(configScript.textContent);
    } catch {
        throw new Error('BookingWidget: reactedge-config contains invalid JSON');
    }

    if (!config.integrations?.api?.graphql) {
        throw new Error('BookingWidget: booking.api missing in global config');
    }

    if (!config.integrations?.api?.auth) {
        throw new Error('BookingWidget: booking.auth missing in global config');
    }

    return config;
}

export function readBookingIntegrationConfig(): BookingIntegrationConfig {
    const configScript = document.getElementById('reactedge-runtime');

    if (!configScript) {
        throw new Error("Booking widget requires a <script id='reactedge-runtime'> block.");
    }

    let config: BookingIntegrationConfig;
    try {
        config = JSON.parse(configScript.textContent);
    } catch {
        throw new Error('BookingWidget: reactedge-runtime contains invalid JSON');
    }

    if (!config.integrations?.cloudflare?.siteKey) {
        throw new Error('BookingWidget: cloudflare missing in reactedge-runtime');
    }

    return config;
}