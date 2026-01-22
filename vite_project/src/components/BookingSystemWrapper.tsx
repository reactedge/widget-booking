import {useVenue} from "../hooks/domain/useVenue.tsx";
import {useEventHosts} from "../hooks/domain/useEventHosts.tsx";
import {useEventTypeGroups} from "../hooks/domain/useEventTypeGroups.tsx";
import {ErrorState} from "./global/ErrorState.tsx";
import {activity} from "../../activity";
import {Spinner} from "./global/Spinner.tsx";
import type {ConfigInfoState} from "../state/Config/type.ts";
import {VisitIntentStateProvider} from "../state/Intent/VisitIntentStateProvider.tsx";
import {UserStateProvider} from "../state/User/UserStateProvider.tsx";
import {BookingSystem} from "./BookingSystem.tsx";
import {ConfigStateProvider} from "../state/Config/ConfigStateProvider.tsx";

interface Props {
    venueId: string
}

export function BookingSystemWrapper({venueId}: Props) {
    const { venue, venueError: venueError } = useVenue(venueId);

    const {
        eventHosts,
        hostsError,
    } = useEventHosts(venue?.id);

    const {
        groups,
        eventTypeGroupError
    } = useEventTypeGroups(venue?.id);

    if (venueError || hostsError || eventTypeGroupError) {
        return <ErrorState />;
    }

    if (!venue || !eventHosts || !groups) {
        activity('config-load', 'Config Data not loaded',{venue, eventHosts, groups});
        return <Spinner />;
    }

    activity('config-load', 'Config Data',{venue, eventHosts, groups});

    const config: ConfigInfoState = {
        venue,
        eventHosts,
        eventTypeGroups: groups
    };

    return (
        <ConfigStateProvider config={config}>
            <VisitIntentStateProvider eventTypeGroups={config.eventTypeGroups} eventHosts={config.eventHosts}>
                <UserStateProvider>
                    <BookingSystem />
                </UserStateProvider>
            </VisitIntentStateProvider>
        </ConfigStateProvider>
    );
}
