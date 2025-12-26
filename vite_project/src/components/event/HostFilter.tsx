import {useVisitIntentState} from "../../state/Intent/useVisitIntentState.ts";
import {useConfigState} from "../../state/Config/useConfigState.ts";

export function HostFilter() {
    const { visitIntent, setEventHost } = useVisitIntentState();
    const { config } = useConfigState()

    if (config.eventHosts === undefined || config.eventHosts.length === 1) return null;

    return (
        <div className="booking-row booking-filter--host">
            <h3>Host</h3>

            <div
                className="booking-options booking-options--host"
                role="group"
                aria-label="Preferred host"
            >
                {config.eventHosts.map((host) => {
                    const isActive = visitIntent.eventTypeId === host.id;

                    return (
                        <button
                            key={host.id}
                            type="button"
                            className={`booking-option ${isActive ? "is-active" : ""}`}
                            aria-pressed={isActive}
                            onClick={() => setEventHost(host.id)}
                        >
                            <span className="booking-option-label">
                                {host.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
