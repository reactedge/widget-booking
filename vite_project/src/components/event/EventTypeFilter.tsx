import {useVisitIntentState} from "../../state/Intent/useVisitIntentState.ts";
import {useEventTypes} from "../../hooks/domain/useEventTypes.tsx";

export function EventTypeFilter() {
    const { visitIntent, setEventType } = useVisitIntentState();
    const { eventTypes, eventTypesLoading } = useEventTypes(visitIntent.eventTypeGroupId);

    if (!visitIntent.eventTypeGroupId || eventTypes === undefined || eventTypesLoading) return null;

    return (
        <div className="booking-filter booking-filter--event-type">
            <div className="booking-filter-label">
                Event type
            </div>

            <div className="booking-options">
                {eventTypes.map((type) => {
                    const isActive = visitIntent.eventTypeId === type.id;

                    return (
                        <button
                            key={type.id}
                            type="button"
                            className={`booking-option ${isActive ? "is-active" : ""}`}
                            aria-pressed={isActive}
                            onClick={() => setEventType(type.id)}
                        >
                            {type.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
