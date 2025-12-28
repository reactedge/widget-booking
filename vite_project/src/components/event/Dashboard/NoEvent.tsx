import React from "react";
import {getDays} from "../../../lib/date.ts";
import type {DaysType} from "../../../types/domain/bookingsystem.type.ts";
import {NoDayEventList} from "./DayEvent/NoDayEventList.tsx";
import {useMediaQuery} from "../../../hooks/ui/useMediaQuery.tsx";

export const NoEvent: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="week-event-list"
             data-layout={isMobile ? 'mobile' : 'desktop'}>
            {getDays().map((day: DaysType) => {
                return (
                    <div key={day.day} className="week-event-day">
                        <h4 className="week-event-day-title">{day.dayLabel}</h4>

                        <NoDayEventList/>
                    </div>
                );
            })}
        </div>
    )
}