import {useMediaQuery} from "../../hooks/ui/useMediaQuery.tsx";
import {GetWeekEvents} from "./Dashboard/GetWeekEvents.tsx";
import {GetWeekEventsForMobile} from "./Dashboard/GetWeekEventsForMobile.tsx";

export function ResponsiveEventDashboard(){
    const isDesktop = useMediaQuery("(min-width: 600px)");

    return isDesktop ? <GetWeekEvents /> : <GetWeekEventsForMobile />;
};
