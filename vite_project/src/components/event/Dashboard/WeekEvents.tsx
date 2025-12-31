import {useState} from "react";
import {getDays} from "../../../lib/date.ts";
import {getDayEventsForDay} from "../../../domain/booking";
import {NoDayEventList} from "./DayEvent/NoDayEventList.tsx";
import {DayEventGroup} from "./DayEvent/DayEventGroup.tsx";
import {DrawerContent} from "./WeekEvents/DrawerContent.tsx";
import type {IntentEvent} from "../../../types/domain/event.type.ts";
import {useUserState} from "../../../state/User/useUserState.ts";
import {useMediaQuery} from "../../../hooks/ui/useMediaQuery.tsx";
import {DrawerInline} from "../../DrawerInline.tsx";
import {getDayGroupKey} from "../../../domain/event/getGroupEventStatus.ts";

interface WeekEventProps {
    events: IntentEvent[];
}

export function WeekEvents({ events }: WeekEventProps) {
    const { user } = useUserState();
    const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

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
                                {dayEventList.map((eventGroup) => {
                                    const groupKey = getDayGroupKey(eventGroup);
                                    const isOpen = openGroupKey === groupKey;

                                    return (
                                        <>
                                            <DayEventGroup
                                                key={groupKey}
                                                eventGroup={eventGroup}
                                                onView={() => setOpenGroupKey(groupKey)}
                                            >
                                            {isOpen && (
                                                <DrawerInline onClose={() => setOpenGroupKey(null)}>
                                                    <DrawerContent eventIds={eventGroup.eventIds} />
                                                </DrawerInline>
                                            )}
                                            </DayEventGroup>
                                        </>
                                    );
                                })}
                            </div>
                        ) : (
                            <NoDayEventList/>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

