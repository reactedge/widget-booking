import type {DaysType, WeeksType} from "../types/domain/bookingsystem.types.ts";

export const getDays = (): DaysType[] => {
    const current = new Date()
    const week = [];
    // Starting Monday not Sunday
    const first = current.getDate() - current.getDay() + 1;
    current.setDate(first);
    for (let i = 0; i < 7; i++) {
        week.push({
            day: current.toLocaleString('en-GB', {  weekday: 'long' }).toLowerCase(),
            dayLabel: current.toLocaleString('en-GB', {  weekday: 'long' })
        });
        current.setDate(current.getDate()+1);
    }

    return week;
}

const getWeekLabel = (index: number) => {
    switch (index) {
        case 0:
            return 'This week'
        case 1:
            return 'Next week'
        default:
            return `in ${index} weeks`
    }
}

const getDateWithoutTime = (date: Date) => {
    return date.toISOString().split('T')[0]
}

export const getDayTimeStart = (date: Date) => {
    const day = getDateWithoutTime(date)

    return `${day}T00:00:00.101Z`
}

export const getDayTimeEnd = (date: Date) => {
    const day = getDateWithoutTime(date)
    return `${day}T23:59:59.101Z`
}

export const getDateInNumberDays = (days: number) => {
    const current = new Date()
    current.setDate(current.getDate()+ days);

    return current
}

export const getWeeks = (scheduleWeekSpan: number): WeeksType[] => {
    const current = new Date()
    const week = [];
    // Starting Monday not Sunday
    const first = current.getDate() - current.getDay() + 1;
    current.setDate(first);
    for (let i = 0; i < scheduleWeekSpan; i++) {
        week.push({
            weekStart: getDayTimeStart(current),
            weekLabel: getWeekLabel(i)
        });
        current.setDate(current.getDate()+7);
    }

    return week;
}

export const getTime = (time: string) => {
    if (time === undefined) return ''

    const date = new Date(time)
    let min = date.getMinutes().toString()

    if (min.length === 1) {
        min = "0" + min.toString();
    }

    let hour = date.getHours().toString()
    if (hour.length === 1) {
        hour = "0" + hour.toString();
    }
    return `${hour}:${min}`
}

export const getDate = (time: string) => {
    const date = new Date(time)
    return date.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric"})
}
