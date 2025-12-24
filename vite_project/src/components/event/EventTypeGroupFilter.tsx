import {useConfigState} from "../../state/Config/useConfigState.ts";
import {useVisitIntentState} from "../../state/Intent/useVisitIntentState.ts";

export function EventTypeGroupFilter() {
    const { visitIntent, setEventTypeGroup } = useVisitIntentState();
    const { config } = useConfigState();

    if (config.eventTypeGroups === undefined || config.eventTypeGroups.length === 1) return null;

    return (
        <div className="booking-filter booking-filter--group">
            <div className="booking-filter-label">
                Appointment type
            </div>

            <div className="booking-options">
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
                            {group.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
