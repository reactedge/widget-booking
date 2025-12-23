import type {DaySchedule} from "../../types/domain/dashboard.type.tsx";

export function buildWeekSchedule(
    events: Event[],
    user: User
): DaySchedule[] {
    return getDays().map(day => ({
        day,
        groups: buildDayGroups(events, day, user)
    }));
}