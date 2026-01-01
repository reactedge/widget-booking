import { useEffect, useRef } from "react";
import { ensureTurnstileLoaded } from "./turnstileService.ts";

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
                console.error(`[turnstile] container #${containerId} not found`);
                return;
            }

            widgetId.current = window.turnstile.render(container, {
                sitekey: siteKey,
                callback: (token: string) => {
                    window.dispatchEvent(
                        new CustomEvent("booking:security-success", {
                            detail: { token }
                        })
                    );
                },
                "expired-callback": () => {
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