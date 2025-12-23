import type {IntentEvent} from "../../../types/domain/event.type.ts";
import {useUser} from "../../../hooks/domain/useUser.tsx";
import {getDays} from "../../../lib/date.ts";
import type {DaysType} from "../../../types/domain/bookingsystem.type.ts";
import type {DayGroupEvent} from "../../../types/domain/dashboard.type.tsx";
import {DayEventGroup} from "./DayEvent/DayEventGroup.tsx";
import {NoDayEventList} from "./DayEvent/NoDayEventList.tsx";
import {DayEventHandler} from "../../../models/DayEvent.ts";
import {BookingDrawer} from "../../BookingDrawer.tsx";
import {ViewGroupEvent} from "./WeekEvents/ViewGroupEvent.tsx";
import {useState} from "react";
import {useUserState} from "../../../state/User/useUserState.ts";

interface WeekEventProps {
    events: IntentEvent[]
}

export function WeekEvents({events}: WeekEventProps) {
    const {user} = useUserState()
    const [viewedEventIds, setViewedEventIds] = useState<string[] | null>(null);

    return (
        <div className="week-event-list">
            {getDays().map((day: DaysType) => {
                const dayEventHandler = new DayEventHandler(day);
                const dayEventList = dayEventHandler.getDayEvents(events, user);

                return (
                    <div
                        key={day.day}
                        className="week-event-day"
                    >
                        <h4 className="week-event-day-title">
                            {day.dayLabel}
                        </h4>

                        {dayEventList.length > 0 && (
                            <div className="week-event-day-groups">
                                {dayEventList.map(
                                    (eventGroup: DayGroupEvent, index: number) => (
                                        <DayEventGroup
                                            key={index}
                                            eventGroup={eventGroup}
                                            onView={(eventIds) => setViewedEventIds(eventIds)}
                                        />
                                    )
                                )}
                            </div>
                        )}

                        {dayEventList.length === 0 && (
                            <NoDayEventList />
                        )}
                    </div>
                );
            })}
            <BookingDrawer
                open={!!viewedEventIds}
                onClose={() => setViewedEventIds(null)}
            >
                {viewedEventIds && (
                    <ViewGroupEvent eventIds={viewedEventIds} />
                )}
            </BookingDrawer>
        </div>
    );
}