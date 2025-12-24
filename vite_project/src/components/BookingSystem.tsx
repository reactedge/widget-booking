import {InitFilter} from "./InitFilter.tsx";
import {useVisitIntentState} from "../state/Intent/useVisitIntentState.ts";
import {EventTypeGroupFilter} from "./event/EventTypeGroupFilter.tsx";
import {EventTypeFilter} from "./event/EventTypeFilter.tsx";
import {WeekFilter} from "./event/WeekFilter.tsx";
import {EventDashboard} from "./event/EventDashboard.tsx";
import {BookingContextSummary} from "./event/Dashboard/BookingContextSummary.tsx";

export function BookingSystem() {
    const { visitIntent} = useVisitIntentState();

    return (
        <>
            {(visitIntent.weekIntent !== "" && visitIntent.eventTypeId !== "") &&  (<>
                <div className="booking-header">
                    <div className="booking-filters">
                        <EventTypeGroupFilter/>

                        {visitIntent.eventTypeGroupId && (
                            <EventTypeFilter/>
                        )}

                        {visitIntent.eventTypeId && (
                            <WeekFilter weekSpan={4}/>
                        )}
                    </div>

                    <BookingContextSummary eventTypeId={visitIntent.eventTypeId} weekStart={visitIntent.weekIntent} />

                    <EventDashboard />
                </div>
            </>)
            }
            {(visitIntent.weekIntent === "" || visitIntent.eventTypeId === "") && (<>
                <InitFilter />
            </>)
            }
        </>
    )
};
