import {EventHostView} from "./EventHostView.tsx";
import {SetEventDetail} from "./SetEventDetail.tsx";
import type {DayGroupEvent} from "../../../../types/domain/dashboard.type.tsx";
import {EventStateProvider} from "../../../../state/Event/EventStateProvider.tsx";
import {getTime} from "../../../../lib/date.ts";
import {useDashboardState} from "../../../../state/Dashboard/useDashboardState.ts";

interface ListingProps {
    eventGroup: DayGroupEvent;
    onView: (eventIds: string[]) => void;
}

export const DayEventGroup: React.FC<ListingProps> = ({ eventGroup, onView }) => {
    const { dashboardState } = useDashboardState();

    const highlight = () => {
        if (dashboardState.lastBookedEventId === null) return false;
        return eventGroup.eventIds.indexOf(dashboardState.lastBookedEventId) > -1
    }

    return (
        <EventStateProvider eventGroup={eventGroup}>
            <div className={`event-card${highlight() ? "--highlighting" : ""}`}>
                <div className="card-info-hidden">
                    {eventGroup.startTime}
                    {eventGroup.name}
                    {eventGroup.eventType}
                </div>
                <div className="event-card__time">
                    {getTime(eventGroup.startTime)}
                </div>

                <div className="event-card__body">
                    <EventHostView eventGroup={eventGroup}/>
                    <SetEventDetail eventGroup={eventGroup} onView={onView}/>
                </div>
            </div>
        </EventStateProvider>
    );
};
