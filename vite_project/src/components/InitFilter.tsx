import {WeekPreference} from "./WeekPreference.tsx";
import {EventTypeGroupPreference} from "./EventTypeGroupPreference.tsx";
import {EventTypePreference} from "./EventTypePreference.tsx";
import {useVisitIntentState} from "../state/Intent/useVisitIntentState.ts";
import {getVisitIntentStep} from "../lib/visit-intent.ts";
import {useConfigState} from "../state/Config/useConfigState.ts";

export function InitFilter() {
    const { config } = useConfigState();
    const { setWeekIntent, setEventTypeGroup, setEventType, visitIntent } = useVisitIntentState()

    const visitIntentStep = getVisitIntentStep(visitIntent)
    const selections = {
        week: undefined,
        eventTypeGroup: undefined,
        eventType: undefined
    }

    return (
        <div className="booking-init">
            <h5 className="booking-title">
                Let&apos;s make this booking easy
            </h5>

            {visitIntentStep === 'Week' && (
                <div className="booking-row">
                  <span className="booking-label">
                    {`When do you need your visit at ${config.venue.name}`}
                  </span>
                    <WeekPreference
                        value={selections?.week}
                        onSelect={(week) => {
                            setWeekIntent(week)
                        }}
                    />
                </div>
            )}

            {visitIntentStep === 'EventTypeGroup' && (
                <div className="booking-row">
                  <span className="booking-label">
                    Select a category that matches your appointment
                  </span>
                    <EventTypeGroupPreference
                        value={selections?.eventTypeGroup}
                        onSelect={(group) => {
                            setEventTypeGroup(group)
                        }}
                    />
                </div>
            )}

            {visitIntentStep === 'EventType' && (
                <div className="booking-row">
                  <span className="booking-label">
                    What type of visit do you need?
                  </span>
                    <EventTypePreference
                        value={selections?.eventType}
                        onSelect={(eventType) => {
                            setEventType(eventType)
                        }}
                    />
                </div>
            )}
        </div>
    )
}
