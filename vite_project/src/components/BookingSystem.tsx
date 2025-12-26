import {InitFilter} from "./InitFilter.tsx";
import {useVisitIntentState} from "../state/Intent/useVisitIntentState.ts";
import {EventTypeGroupFilter} from "./event/EventTypeGroupFilter.tsx";
import {EventTypeFilter} from "./event/EventTypeFilter.tsx";
import {WeekFilter} from "./event/WeekFilter.tsx";
import {EventDashboard} from "./event/EventDashboard.tsx";
import {BookingContextSummary} from "./event/Dashboard/BookingContextSummary.tsx";
import {HostFilter} from "./event/HostFilter.tsx";
import {useMediaQuery} from "../hooks/ui/useMediaQuery.tsx";

export function BookingSystem() {
    const { visitIntent} = useVisitIntentState();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="booking-system">
            {(visitIntent.weekIntent !== "" && visitIntent.eventTypeId !== "" && visitIntent.hostId !== "") && (<>
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

                        {visitIntent.hostId && (
                            <HostFilter />
                        )}
                    </div>

                    <BookingContextSummary eventTypeId={visitIntent.eventTypeId} weekStart={visitIntent.weekIntent}/>

                    <EventDashboard/>
                </div>
            </>)
            }
            {(visitIntent.weekIntent === "" || visitIntent.eventTypeId === "" || visitIntent.hostId === "") && (<>
                <InitFilter/>
            </>)
            }
        </div>
    )
};
