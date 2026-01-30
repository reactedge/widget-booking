import { useEffect, useRef } from "react";
import { ensureTurnstileLoaded } from "./turnstileService.ts";
import {activity} from "../../activity";

type TurnstileProps = {
    siteKey: string;
    containerId: string;
};

export function Turnstile({ siteKey, containerId }: TurnstileProps) {
    const widgetId = useRef<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        ensureTurnstileLoaded().then(() => {
            if (cancelled || !window.turnstile) return;

            const container = document.getElementById(containerId);
            if (!container) {
                activity('turnstile', `[turnstile] container #${containerId} not found`, null, 'error');
                return;
            }

            activity('turnstile', '[turnstile] container rendering', null, 'info');

            widgetId.current = window.turnstile.render(container, {
                sitekey: siteKey,
                callback: (token: string) => {
                    activity('turnstile', '[turnstile] event sent', {"eventName": "booking:security-success"}, 'info');
                    window.dispatchEvent(
                        new CustomEvent("booking:security-success", {
                            detail: { token }
                        })
                    );
                },
                "expired-callback": () => {
                    activity('turnstile', '[turnstile] event sent', {"eventName": "booking:security-expired"}, 'info');
                    window.dispatchEvent(
                        new CustomEvent("booking:security-expired")
                    );
                }
            });
        });

        return () => {
            cancelled = true;
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
            }
        };
    }, [siteKey, containerId]);

    return null;
}