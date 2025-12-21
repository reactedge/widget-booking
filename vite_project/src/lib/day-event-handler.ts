import type {DaySchedule} from "../types/domain/dashboard.types.tsx";
import {getDays} from "./date.ts";

export function buildWeekSchedule(
    events: Event[],
    user: User
): DaySchedule[] {
    return getDays().map(day => ({
        day,
        groups: buildDayGroups(events, day, user)
    }));
}
