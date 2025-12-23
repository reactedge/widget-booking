import {useEventTypeGroups} from "../../hooks/domain/useEventTypeGroups.tsx";
import {useVisitIntentState} from "../../state/Intent/useVisitIntentState.ts";

export function EventTypeGroupFilter() {
    const { visitIntent, setEventTypeGroup } = useVisitIntentState();
    const { groups, eventTypeGrouploading } = useEventTypeGroups();

    if (eventTypeGrouploading) return null;

    return (
        <div className="booking-filter booking-filter--group">
            <div className="booking-filter-label">
                Appointment type
            </div>

            <div className="booking-options">
                {groups.map((group) => {
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
