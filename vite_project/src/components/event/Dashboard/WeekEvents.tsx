import type {IntentEvent} from "../../../types/domain/event.type.ts";

interface WeekEventProps {
    events: IntentEvent[]
}

export function WeekEvents({events}: WeekEventProps) {
    return (<>No event</>)
}