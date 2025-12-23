import {EventHostView} from "./EventHostView.tsx";
import {SetEventDetail} from "./SetEventDetail.tsx";
import type {DayGroupEvent} from "../../../../types/domain/dashboard.type.tsx";
import {EventStateProvider} from "../../../../state/Event/EventStateProvider.tsx";
import {getTime} from "../../../../lib/date.ts";

interface ListingProps {
    eventGroup: DayGroupEvent;
    onView: (eventIds: string[]) => void;
}

export const DayEventGroup: React.FC<ListingProps> = ({ eventGroup, onView }) => {
    return (
        <EventStateProvider eventGroup={eventGroup}>
            <div className="event-card">
                <div className="event-card__time">
                    {getTime(eventGroup.startTime)}
                </div>

                <div className="event-card__body">
                    <div className="event-card__host">
                        <EventHostView eventGroup={eventGroup}/>
                    </div>

                    <SetEventDetail eventGroup={eventGroup} onView={onView}/>
                </div>
            </div>
        </EventStateProvider>
    );
};
