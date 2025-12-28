import {InitFilter} from "./InitFilter.tsx";
import {useVisitIntentState} from "../state/Intent/useVisitIntentState.ts";
import {EventTypeGroupFilter} from "./event/EventTypeGroupFilter.tsx";
import {EventTypeFilter} from "./event/Filter/EventTypeFilter.tsx";
import {WeekFilter} from "./event/Filter/WeekFilter.tsx";
import {EventDashboard} from "./event/EventDashboard.tsx";
import {BookingContextSummary} from "./event/Dashboard/BookingContextSummary.tsx";
import {useMediaQuery} from "../hooks/ui/useMediaQuery.tsx";
import {HostFilter} from "./event/Filter/HostFilter.tsx";

export function BookingSystem() {
    const { visitIntent} = useVisitIntentState();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="booking-system">
            {(visitIntent.weekIntent !== null && visitIntent.eventTypeId !== null) && (<>
                <div className="booking-header">
                    <div className="booking-filters"
                         data-layout={isMobile ? 'mobile' : 'desktop'}>
                        <EventTypeGroupFilter/>

                        {visitIntent.eventTypeGroupId && (
                            <EventTypeFilter/>
                        )}

                        {visitIntent.eventTypeId && (
                            <WeekFilter weekSpan={4}/>
                        )}

                        {((visitIntent.hostId!=="" || visitIntent.hostId===undefined) || (visitIntent.hostId==="")) && (
                            <HostFilter />
                        )}
                    </div>

                    <BookingContextSummary eventTypeId={visitIntent.eventTypeId} weekStart={visitIntent.weekIntent}/>

                    <EventDashboard/>
                </div>
            </>)
            }
            {(visitIntent.weekIntent === null || visitIntent.eventTypeId === null) && (<>
                <InitFilter/>
            </>)
            }
        </div>
    )
};
