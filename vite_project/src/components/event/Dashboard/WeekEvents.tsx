import {useState} from "react";
import {getDays} from "../../../lib/date.ts";
import {getDayEventsForDay} from "../../../domain/booking";
import {NoDayEventList} from "./DayEvent/NoDayEventList.tsx";
import {DayEventGroup} from "./DayEvent/DayEventGroup.tsx";
import {DrawerContent} from "./WeekEvents/DrawerContent.tsx";
import type {IntentEvent} from "../../../types/domain/event.type.ts";
import {useUserState} from "../../../state/User/useUserState.ts";
import {useMediaQuery} from "../../../hooks/ui/useMediaQuery.tsx";
import {BookingDrawer} from "../../BookingDrawer.tsx";
import type {DayGroupEvent} from "../../../types/domain/dashboard.type.tsx";

interface WeekEventProps {
    events: IntentEvent[];
}

export function WeekEvents({ events }: WeekEventProps) {
    const { user } = useUserState();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [viewedEventIds, setViewedEventIds] = useState<string[] | null>(null);
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    return (
        <div
            className="week-event-list"
            data-layout={isMobile ? 'mobile' : 'desktop'}
        >
            {getDays().map((day) => {
                const dayEventList = getDayEventsForDay(day, events, user);

                return (
                    <div key={day.day} className="week-event-day">
                        <h4 className="week-event-day-title">{day.dayLabel}</h4>

                        {dayEventList.length > 0 ? (
                            <div className="week-event-day-groups">
                                {dayEventList.map(
                                    (eventGroup: DayGroupEvent, index: number) => (
                                        <DayEventGroup
                                            key={index}
                                            eventGroup={eventGroup}
                                            onView={(eventIds) => {
                                                setViewedEventIds(eventIds);
                                                setIsOpen(true);
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <NoDayEventList/>
                        )}
                    </div>
                );
            })}
            {isOpen && (
                <div className="drawer-inline">
                    <BookingDrawer
                        open={!!viewedEventIds}
                        onClose={() => {
                            setViewedEventIds(null);
                            setIsOpen(false);
                        }}
                    >
                        {viewedEventIds && (
                            <DrawerContent eventIds={viewedEventIds}/>
                        )}
                    </BookingDrawer>
                </div>
            )}
        </div>
    );
}

