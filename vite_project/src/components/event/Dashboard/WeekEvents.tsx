import {useState} from "react";
import {getDays} from "../../../lib/date.ts";
import type {DaysType} from "../../../types/domain/bookingsystem.type.ts";
import {getDayEventsForDay} from "../../../domain/booking";
import type {DayGroupEvent} from "../../../types/domain/dashboard.type.tsx";
import {NoDayEventList} from "./DayEvent/NoDayEventList.tsx";
import {DayEventGroup} from "./DayEvent/DayEventGroup.tsx";
import {BookingDrawer} from "../../BookingDrawer.tsx";
import {DrawerContent} from "./WeekEvents/DrawerContent.tsx";
import type {IntentEvent} from "../../../types/domain/event.type.ts";
import {useUserState} from "../../../state/User/useUserState.ts";
import {useMediaQuery} from "../../../hooks/ui/useMediaQuery.tsx";

interface WeekEventProps {
    events: IntentEvent[];
}

export function WeekEvents({ events }: WeekEventProps) {
    const { user } = useUserState();
    const [activeGroupEventIds, setActiveGroupEventIds] =
        useState<string[] | null>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleViewGroup = (eventIds: string[]) => {
        setActiveGroupEventIds(eventIds);
    };

    const closeDrawer = () => {
        setActiveGroupEventIds(null);
    };

    return (
        <div className="week-event-list"
             data-layout={isMobile ? 'mobile' : 'desktop'}>
            {getDays().map((day: DaysType) => {
                const dayEventList = getDayEventsForDay(day, events, user);

                //if (dayEventList.length ===0) return null;

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
                    <DrawerContent eventIds={activeGroupEventIds} />
                )}
            </BookingDrawer>
        </div>
    );
}
