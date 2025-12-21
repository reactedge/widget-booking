import React from "react";
import type {DayGroupEvent} from "../../../../types/domain/dashboard.type.tsx";
import {EventStateProvider} from "../../../../state/Event/EventStateProvider.tsx";
import {getTime} from "../../../../lib/date.ts";
import {EventHostView} from "./EventHostView.tsx";
import {SetEventDetail} from "./SetEventDetail.tsx";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const DayEventGroup: React.FC<ListingProps> = ({ eventGroup }) => {
    return (
        <EventStateProvider eventGroup={eventGroup}>
            <div
                /*status={eventGroup.status}*/
                className="day-event-group"
            >
                <p className="day-event-group-time">
                    {getTime(eventGroup.startTime)}
                </p>

                <div className="day-event-group-hosts">
                    <EventHostView eventGroup={eventGroup} />
                </div>

                <div className="day-event-group-details">
                    <SetEventDetail eventGroup={eventGroup} />
                </div>
            </div>
        </EventStateProvider>
    );
};
