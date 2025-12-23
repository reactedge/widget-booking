import {useState} from "react";
import {getDays} from "../../../lib/date.ts";
import type {DaysType} from "../../../types/domain/bookingsystem.type.ts";
import {getDayEventsForDay} from "../../../domain/booking";
import type {DayGroupEvent} from "../../../types/domain/dashboard.type.tsx";
import {NoDayEventList} from "./DayEvent/NoDayEventList.tsx";
import {DayEventGroup} from "./DayEvent/DayEventGroup.tsx";
import {BookingDrawer} from "../../BookingDrawer.tsx";
import {ViewGroupEvent} from "./WeekEvents/ViewGroupEvent.tsx";
import type {IntentEvent} from "../../../types/domain/event.type.ts";
import {useUserState} from "../../../state/User/useUserState.ts";

interface WeekEventProps {
    events: IntentEvent[];
}

export function WeekEvents({ events }: WeekEventProps) {
    const { user } = useUserState();
    const [activeGroupEventIds, setActiveGroupEventIds] =
        useState<string[] | null>(null);

    const handleViewGroup = (eventIds: string[]) => {
        setActiveGroupEventIds(eventIds);
    };

    const closeDrawer = () => {
        setActiveGroupEventIds(null);
    };

    return (
        <div className="week-event-list">
            {getDays().map((day: DaysType) => {
                const dayEventList = getDayEventsForDay(day, events, user);

                return (
                    <div key={day.day} className="week-event-day">
                        <h4 className="week-event-day-title">{day.dayLabel}</h4>

                        {dayEventList.length > 0 ? (
                            <div className="week-event-day-groups">
                                {dayEventList.map((eventGroup: DayGroupEvent, index) => (
                                    <DayEventGroup
                                        key={index}
                                        eventGroup={eventGroup}
                                        onView={handleViewGroup}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NoDayEventList />
                        )}
                    </div>
                );
            })}

            <BookingDrawer open={!!activeGroupEventIds} onClose={closeDrawer}>
                {activeGroupEventIds && (
                    <ViewGroupEvent eventIds={activeGroupEventIds} />
                )}
            </BookingDrawer>
        </div>
    );
}
