import {BookingSystem} from "./components/BookingSystem.tsx";
import {useEventTypeGroups} from "./hooks/domain/useEventTypeGroups.tsx";
import {Spinner} from "./components/global/Spinner.tsx";
import {ErrorState} from "./components/global/ErrorState.tsx";
import {VisitIntentStateProvider} from "./state/Intent/VisitIntentStateProvider.tsx";
import {useVenue} from "./hooks/domain/useVenue.tsx";
import {useEventHosts} from "./hooks/domain/useEventHosts.tsx";
import {ConfigStateProvider} from "./state/Config/ConfigStateProvider.tsx";
import type {ConfigInfoState} from "./state/Config/type.ts";

export function BookingSystemWidget() {
    const { venue, venueError: venueError } = useVenue();
    const venueId = venue?.id;

    const {
        eventHosts,
        hostsError,
    } = useEventHosts(venueId);

    const {
        groups,
        eventTypeGroupError
    } = useEventTypeGroups(venueId);

    if (venueError || hostsError || eventTypeGroupError) {
        return <ErrorState />;
    }

    if (!venue || !eventHosts || !groups) {
        return <Spinner />;
    }

    const config: ConfigInfoState = {
        venue,
        eventHosts,
        eventTypeGroups: groups,
    };

    return (
        <ConfigStateProvider config={config}>
            <VisitIntentStateProvider eventTypeGroups={config.eventTypeGroups}>
                <BookingSystem />
            </VisitIntentStateProvider>
        </ConfigStateProvider>
    );
}
