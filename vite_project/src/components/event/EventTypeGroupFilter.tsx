import {useConfigState} from "../../state/Config/useConfigState.ts";
import {useVisitIntentState} from "../../state/Intent/useVisitIntentState.ts";

export function EventTypeGroupFilter() {
    const { visitIntent, setEventTypeGroup } = useVisitIntentState();
    const { config } = useConfigState();

    if (config.eventTypeGroups === undefined || config.eventTypeGroups.length <= 1) return null;

    return (
        <div className="booking-row booking-options--group">
            <h3>Appointment type</h3>

            <div
                className="booking-options booking-options--event-type-group"
                role="group"
                aria-label="Preferred event-type-group"
            >
                {config.eventTypeGroups.map((group) => {
                    const isActive = visitIntent.eventTypeGroupId === group.id;

                    return (
                        <button
                            key={group.id}
                            type="button"
                            className={`booking-option ${isActive ? "is-active" : ""}`}
                            aria-pressed={isActive}
                            onClick={() => setEventTypeGroup(group.id)}
                        >
                            <span className="booking-option-label">
                                {group.label}
                            </span>
                        </button>
                );
                })}
            </div>
        </div>
    );
}
