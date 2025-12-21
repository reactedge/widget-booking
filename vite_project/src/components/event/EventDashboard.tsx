import { useVisitIntentState } from "../../state/Intent/useVisitIntentState.ts";
import {ResponsiveEventDashboard} from "./ResponsiveEventDashboard.tsx";

export function EventDashboard(){
    const { visitIntent } = useVisitIntentState();

    if (!visitIntent.eventTypeId || !visitIntent.weekIntent) {
        return null;
    }

    return <ResponsiveEventDashboard />;
};
