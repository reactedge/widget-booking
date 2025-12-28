import {useVisitIntentState} from "../../../state/Intent/useVisitIntentState.ts";
import {useEventTypes} from "../../../hooks/domain/useEventTypes.tsx";
import {FilterSection} from "../FilterSection.tsx";
import {EventTypeOptions} from "./EventTypeFilter/EventTypeOptions.tsx";

export function EventTypeFilter() {
    const { visitIntent, setEventType } = useVisitIntentState();
    const { eventTypes, eventTypesLoading } = useEventTypes(visitIntent.eventTypeGroupId);

    if (!visitIntent.eventTypeGroupId || eventTypes === undefined || eventTypesLoading) return null;

    const selectedEventType = eventTypes.find(
        t => t.id === visitIntent.eventTypeId
    );


    return (
        <FilterSection
            title="Event type"
            isResolved={!!visitIntent.eventTypeId}
            summary={selectedEventType?.label}
            onEdit={() => setEventType('')}
        >
            <EventTypeOptions
                eventTypes={eventTypes}
                selectedId={visitIntent.eventTypeId}
                onSelect={setEventType}
            />
        </FilterSection>
    )

    /*return (
        <div className="booking-row booking-filter--event-type">
            <h3>Event type</h3>

            <div
                className="booking-options booking-options--event-type"
                role="group"
                aria-label="Preferred event-type"
            >
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
                            <span className="booking-option-label">
                                {type.label}
                            </span>
                        </button>
                );
                })}
            </div>
        </div>
    );*/
}
